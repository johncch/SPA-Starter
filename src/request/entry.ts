import { axiosInstance, Wrapper } from "."
import { EntriesResponse, GetEntriesParams } from "./types"

export async function getEntries(
    params: GetEntriesParams
): Promise<EntriesResponse> {
    return axiosInstance
        .get<EntriesResponse>("/v1/entries", { params })
        .then((response: Wrapper<EntriesResponse>) => response.data)
}
