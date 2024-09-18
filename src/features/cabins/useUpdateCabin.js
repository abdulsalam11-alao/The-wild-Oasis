import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateEditCabins } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updatecabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => CreateEditCabins(newCabinData, id),
    onSuccess: () => {
      toast.success(" cabin successfully Edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updatecabin, isUpdating };
}
