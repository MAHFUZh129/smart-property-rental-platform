// Starting values for the add / edit property form.
// All values are strings, because that is what form inputs hold.

export const EMPTY_PROPERTY_VALUES = {
  title: "",
  propertyType: "",
  description: "",
  address: "",
  city: "",
  area: "",
  price: "",
  bedrooms: "",
  bathrooms: "",
  size: "",
  availableUnits: "1",
  amenities: [],
  images: "", 
};

// Turns a property from MongoDB into values the edit form can show
export const toFormValues =(property)=> {
  return {
    title: property.title ?? "",
    propertyType: property.propertyType ?? "",
    description: property.description ?? "",
    address: property.address ?? "",
    city: property.city ?? "",
    area: property.area ?? "",
    price: String(property.price ?? ""),
    bedrooms: String(property.bedrooms ?? ""),
    bathrooms: String(property.bathrooms ?? ""),
    size: String(property.size ?? ""),
    availableUnits: String(property.availableUnits ?? "1"),
    amenities: property.amenities ?? [],
    images: (property.images ?? []).join("\n"),
  };
}