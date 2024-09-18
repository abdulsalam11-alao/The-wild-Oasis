import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Loaded");
  }
  return data;
}

export async function CreateEditCabins(createCabin, id) {
  console.log(createCabin);
  const hasImagePath = createCabin?.image?.startsWith?.(supabaseUrl);
  const imageName = createCabin.image
    ? `${Math.random()}-${createCabin.image.name}`.replaceAll("/", "")
    : "";

  const imagePath = hasImagePath
    ? createCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query = query
      .insert([{ ...createCabin, image: imagePath }])
      .select()
      .single();
  } else {
    query = query
      .update({ ...createCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created or updated");
  }
  // 2. upload image

  if (hasImagePath) return data;

  const { error: StorageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, createCabin.image);

  //3 . Deletethe cabin IFthere was an error uploading image

  if (StorageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(StorageError);
    throw new Error(
      "Cabin image could not be uploaded, and the cabin was not created"
    );
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
