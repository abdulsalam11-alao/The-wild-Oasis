import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Loaded");
  }
  return data;
}

export async function CreateCabins(createCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([createCabin])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be Created");
  }
  return data;
}

export async function deleteCabins(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
