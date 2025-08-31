import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios"

const fetchHashTags = async(q: string) => {
	const response = await api.get("/hashtag/", {params: {q}});
	return response.data;
};

const createHashTag = async(name: string) => {
	const response = await api.post("/hashtag/", name, {
		headers: {
			"Content-Type": "application/json",
		}
	});
	return response.data;
};

export const useGetHashtag = (q: string) => {
	const {data, isLoading, isError} = useQuery({
		queryKey: ["hashtags", q],
		queryFn: () => fetchHashTags(q),
		enabled: q.length > 2,
		retry: 2,
	});

	return {data, isLoading, isError};
};

export const useCreateHashtag = () => {
	const queryClient = useQueryClient();

	const {mutate, isError, isPending, isSuccess} = useMutation({
		mutationFn: createHashTag,
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ["hashtags"]});
		},
	});
	return {mutate, isError, isPending, isSuccess};
}