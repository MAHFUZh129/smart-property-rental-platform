"use server"
import { dbConnect } from "@/lib/dbConnect";
import { getCurrentUser } from "./auth";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";


const notifications = dbConnect('notifications')
const users = dbConnect('users')

//func:1 getting nessages from data
export const getMyNotifications = async (filter = "") => {

    const user = await getCurrentUser();
    if (!user) return []

    const query = { userEmail: user.email }
    if (filter === "unread") query.read = false

    const result = await notifications.find(query).sort({ createdAt: -1 }).limit(40).toArray()

    return result.map((n) => ({
        _id: n._id.toString(),
        type: n.type,
        title: n.title,
        message: n.message,
        link: n.link,
        read: n.read,
        createdAt: n.createdAt?.toISOString(),
    }))

}

//func:2 marking All As Read
export const markAllAsRead = async () => {

    const user = await getCurrentUser();
    if (!user) return;

    const result = await notifications.updateMany(
        { userEmail: user.email, read: false }, { $set: { read: true } })

    revalidatePath("/tenant/dashboard/messages")

}

//func:3 marking a certain notification as read
export const openNotification = async (formData) => {

    const id = formData.get('id')?.toString()

    const user = await getCurrentUser();
    if (!user) return

    let link = ""

    if (ObjectId.isValid(id)) {
        const result = await notifications.findOneAndUpdate({ _id: new ObjectId(id), userEmail: user.email }, { $set: { read: true } })

        link = result?.link || ""

    }



    redirect(link.startsWith("/") ? link : `/${user.role}/dashboard/messages`)

}




//func:4 getting unread counts in number
export async function getUnreadCount() {
    const user = await getCurrentUser();
    if (!user) return 0

    const result = await notifications.countDocuments({ userEmail: user.email, read: false })

    return result
}



//func:5 saves one notification for one user in db
export const createNotification = async ({ userEmail, type, title, message, link = "" }) => {

    try {
        if (!userEmail) return

        await notifications.insertOne({
            userEmail,
            type,
            title,
            message,
            link,
            read: false,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Could not create notification:", error);
    }
}



// Sends the same notification to every admin.
export const notifyAdmins = async({ type, title, message, link = "" }) =>{

    try {
        const admins = await users.find({ role: "admin" }).project({ email: 1,_id: 0 }).toArray();
        if (admins.length === 0) return;

        await notifications.insertMany(
            admins.map((admin) => ({
                userEmail: admin?.email,
                type,
                title,
                message,
                link,
                read: false,
                createdAt: new Date(),
            }))
        );
    } catch (error) {
        console.error("Could not notify admins:", error);
    }
}
