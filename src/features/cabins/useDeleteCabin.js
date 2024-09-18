import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins as deleteCabinsApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useDeleteCabins() {
  const QueryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabins } = useMutation({
    mutationFn: (id) => deleteCabinsApi(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      QueryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabins };
}
