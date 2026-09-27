export const faqCategories = [
  {
    category: "Getting started",
    items: [
      {
        q: "Do I need an account to browse properties?",
        a: "No — anyone can browse listings, view property details, and search or filter without an account. You'll need to log in once you're ready to send a rental request.",
      },
      {
        q: "Can I sign up with Google?",
        a: "Yes. You can register and log in with email and password, or with your Google account. Either way, you'll choose whether you're joining as a tenant or a landlord.",
      },
      {
        q: "I forgot my password. What now?",
        a: "Use \"Reset password\" on the login page. We'll send a reset link to the email on your account, and your session on other devices stays untouched.",
      },
    ],
  },
  {
    category: "For tenants",
    items: [
      {
        q: "How does a rental request actually work?",
        a: "You send a request on a property you're interested in, including your preferred move-in date and a short message. The landlord reviews it and either approves or rejects it — you'll see the status update in your dashboard either way.",
      },
      {
        q: "What happens after my request is approved?",
        a: "Once a landlord approves your request, Rentora creates a lease with your rent amount, deposit, and lease dates, and the unit is marked as occupied. You'll find the lease details in your tenant dashboard.",
      },
      {
        q: "How do I pay rent?",
        a: "Rent payments are made directly through your tenant dashboard. You can view your full payment history at any time, including pending, paid, and failed payments.",
      },
      {
        q: "Something's broken in my unit — what do I do?",
        a: "Submit a maintenance request from your dashboard with a title, description, and priority level. Your landlord is notified immediately and you can track its status from pending through to resolved.",
      },
      {
        q: "Can I leave a review for every property I look at?",
        a: "Reviews are limited to properties you've actually rented, and you can't submit unlimited reviews for the same rental — this keeps ratings meaningful for other renters.",
      },
    ],
  },
  {
    category: "For landlords",
    items: [
      {
        q: "Why isn't my new listing showing up publicly yet?",
        a: "Every new property goes through admin approval before it's visible to the public. This keeps listings accurate and prevents spam or duplicate posts. You'll get a notification once it's approved.",
      },
      {
        q: "Can I manage multiple properties from one account?",
        a: "Yes. Add, edit, or remove as many properties as you own, each with its own units, images, and availability. Your properties and tenants stay isolated from other landlords on the platform.",
      },
      {
        q: "How do I know when someone requests to rent my property?",
        a: "You'll get a notification and see it listed under rental requests in your landlord dashboard, where you can approve or reject it along with the tenant's message and requested date.",
      },
      {
        q: "Where can I see my earnings?",
        a: "Your landlord dashboard shows monthly revenue, occupied vs. available units, and a full record of rent payments across all your properties.",
      },
    ],
  },
  {
    category: "Payments & security",
    items: [
      {
        q: "Is my payment information secure?",
        a: "Payment processing is handled through Stripe, so card details never touch our servers directly. On our side, every request is checked against your account's role and ownership before any data is returned or changed.",
      },
      {
        q: "Can other tenants or landlords see my data?",
        a: "No. A tenant only sees their own leases, payments, and requests. A landlord only sees their own properties and tenants. Access is enforced on the server, not just hidden in the interface.",
      },
      {
        q: "What if I disagree with a landlord's decision?",
        a: "Admins can review rental requests, payments, and maintenance records platform-wide, and can step in on reported issues. Reach out through the contact page and reference your property or request.",
      },
    ],
  },
];