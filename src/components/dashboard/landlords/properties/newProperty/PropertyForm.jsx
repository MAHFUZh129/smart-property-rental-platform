"use client"
import React, { useActionState, useState } from 'react';
import { AlertCircle, Banknote, FileText, ImageIcon, Lightbulb, Loader2, MapPin, ShieldCheck, Sparkles, X } from 'lucide-react';
import { Field, FormSection, inputClass } from './Formparts ';
import Link from 'next/link';
import { AMENITY_OPTIONS, CITIES, PROPERTY_TYPES } from '@/data/dashboard/landlord-Constants';
import { uploadImage } from '@/lib/utils/uploadImage';

const PropertyForm = ({ action, initialValues, propertyId, submitLabel, cancelHref, note }) => {

    // form submit
    const [state, formAction, isPending] = useActionState(action, {
        errors: {},
        values: initialValues,
        message: "",
    })

    const v = state?.values || initialValues;
    const e = state?.errors || {}

    // for uploading images
    const [uploadedImages, setUploadedImages] = useState(() =>
        (initialValues.images || "").split(/\r?\n/).filter(Boolean)
    );

    const [isUploadingImages, setIsUploadingImages] = useState(false);
    const [imageError, setImageError] = useState("");

    const handleImageChange = async (e) => {

        const files = Array.from(e.target.files || [])

        // File input reset 
        e.target.value = ""

        if (uploadedImages.length + files.length > 10) {
            setImageError("You can upload a maximum of 10 photos.");
            return;
        }

        setImageError("");
        setIsUploadingImages(true);

        try {
            const imageUrls = await Promise.all(
                files.map((file) => uploadImage(file))
            );

            setUploadedImages((previous) => [...previous, ...imageUrls]);
        }
        catch (error) {
            setImageError(error.message || "Image upload failed.");
        }
        finally {
            setIsUploadingImages(false);
        }

    }


    return (
        <div>
            <form action={formAction} className="grid gap-6 lg:grid-cols-3">
                {propertyId && <input type="hidden" name="propertyId" value={propertyId} />}

                <div className="space-y-6 lg:col-span-2">
                    {state?.message && (
                        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            <AlertCircle className="size-5 shrink-0" />
                            {state?.message}
                        </div>
                    )}

                    <FormSection icon={FileText} title="Basic information" description="What kind of property is it?">
                        <Field label="Title" error={e.title} full>
                            <input name="title" defaultValue={v.title} placeholder="e.g. Sunny 3-bedroom apartment" className={inputClass(e.title)} />
                        </Field>
                        <Field label="Property type" error={e.propertyType}>
                            <select name="propertyType" defaultValue={v.propertyType} className={inputClass(e.propertyType)}>
                                <option value="">Select a type</option>
                                {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </Field>
                        <Field label="Description" error={e.description} full hint="At least 20 characters.">
                            <textarea name="description" rows={5} defaultValue={v.description} placeholder="Describe the property, the neighbourhood and who it suits." className={inputClass(e.description)} />
                        </Field>
                    </FormSection>

                    <FormSection icon={MapPin} title="Location" description="Where is the property?">
                        <Field label="City" error={e.city}>
                            <select name="city" defaultValue={v.city} className={inputClass(e.city)}>
                                <option value="">Select a city</option>
                                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </Field>
                        <Field label="Area" error={e.area}>
                            <input name="area" defaultValue={v.area} placeholder="e.g. Dhanmondi" className={inputClass(e.area)} />
                        </Field>
                        <Field label="Full address" error={e.address} full>
                            <input name="address" defaultValue={v.address} placeholder="House, road, area" className={inputClass(e.address)} />
                        </Field>
                    </FormSection>

                    <FormSection icon={Banknote} title="Pricing & details">
                        <Field label="Monthly rent" error={e.price}>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500">৳</span>
                                <input name="price" type="number" min="0" defaultValue={v.price} className={inputClass(e.price, "pl-8 pr-3.5")} />
                            </div>
                        </Field>
                        <Field label="Size (sqft)" error={e.size}>
                            <input name="size" type="number" min="0" defaultValue={v.size} className={inputClass(e.size)} />
                        </Field>
                        <Field label="Bedrooms" error={e.bedrooms}>
                            <input name="bedrooms" type="number" min="0" defaultValue={v.bedrooms} className={inputClass(e.bedrooms)} />
                        </Field>
                        <Field label="Bathrooms" error={e.bathrooms}>
                            <input name="bathrooms" type="number" min="0" defaultValue={v.bathrooms} className={inputClass(e.bathrooms)} />
                        </Field>
                        <Field label="Available units" error={e.availableUnits} hint="How many units can be rented right now.">
                            <input name="availableUnits" type="number" min="0" defaultValue={v.availableUnits} className={inputClass(e.availableUnits)} />
                        </Field>
                    </FormSection>

                    <FormSection icon={Sparkles} title="Amenities" description="Tick everything the property offers.">
                        <div className="flex flex-wrap gap-2 sm:col-span-2">
                            {AMENITY_OPTIONS.map((a) => (
                                <label key={a} className="cursor-pointer">
                                    <input type="checkbox" name="amenities" value={a} defaultChecked={v.amenities?.includes(a)} className="peer sr-only" />
                                    <span className="inline-block rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-600 hover:border-brand-300 peer-checked:border-brand-600 peer-checked:bg-brand-50 peer-checked:font-medium peer-checked:text-brand-700 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-300">
                                        {a}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FormSection>

                    {/* image  uploader */}
                    <FormSection
                        icon={ImageIcon}
                        title="Photos"
                        description="Upload your property photos (up to 10) from your device. The first photo will be the cover."
                    >
                        <Field label="Upload photos" error={e.images} full>
                            {/* input 1 */}
                            <input
                                type="hidden"
                                name="images"
                                value={uploadedImages.join("\n")}
                            />
                            {/* input 2 */}
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                disabled={isUploadingImages || uploadedImages.length >= 10}
                                onChange={handleImageChange}
                                className="block w-full rounded-xl border border-slate-200 p-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700"
                            />

                            <p className="mt-2 text-xs text-slate-500">
                                {uploadedImages.length} of 10 photos uploaded
                            </p>

                            {isUploadingImages && (
                                <p className="mt-2 text-sm text-blue-600">
                                    Uploading photos...
                                </p>
                            )}

                            {imageError && (
                                <p className="mt-2 text-sm text-red-500">
                                    {imageError}
                                </p>
                            )}

                            {/* uploaded photo previews */}
                            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {
                                    uploadedImages.map((url, index) => (<div key={url} className="relative">
                                        <img
                                            src={url}
                                            alt={`Property photo ${index + 1}`}
                                            className="h-32 w-full rounded-xl border border-slate-200 object-cover"
                                        />

                                        {index === 0 && (
                                            <span className="absolute left-2 top-2 rounded-md bg-blue-600 px-2 py-1 text-xs text-white">
                                                Cover
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setUploadedImages((previous) =>
                                                    previous.filter((_, i) => i !== index)
                                                )
                                            }
                                            className="absolute right-2 top-2 flex rounded-2xl bg-white px-2 py-1 text-xs font-medium text-red-600 shadow"
                                        >
                                            <X size={16} /> Remove
                                        </button>
                                    </div>))
                                }

                            </div>

                        </Field>
                    </FormSection>


                </div>

                {/* Right column: stays in view on large screens */}
                <aside className="lg:col-span-1">
                    <div className="space-y-4 lg:sticky lg:top-24">
                        {note && (
                            <div className="flex gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-900">
                                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-600" />
                                {note}
                            </div>
                        )}

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                                <Lightbulb className="size-4 text-amber-500" /> Tips for a great listing
                            </h3>
                            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
                                <li>Use a clear title with the type and size.</li>
                                <li>Add at least 3 bright, clear photos.</li>
                                <li>Be honest about the rent and amenities.</li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button type="submit" disabled={isPending} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-70">
                                {isPending && <Loader2 className="size-4 animate-spin" />}
                                {isPending ? "Saving..." : submitLabel}
                            </button>
                            <Link href={cancelHref} className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </aside>
            </form>
        </div>
    );
};

export default PropertyForm;