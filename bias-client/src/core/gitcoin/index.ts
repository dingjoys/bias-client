
import { getFetcher } from '@/lib/restUtils';
import useSWR from 'swr';
const defaultSWRConfig = {
    refreshInterval: 0,
    revalidateOnFocus: false,
};
const apikey = "q2UyZHyh.d0HNGyEhmJl98b0RJfEGix6DZqqxKScd"
export const useGitcoinPass = (owner) => {
    const { data } = useSWR(
        owner ? [`https://api.scorer.gitcoin.co/registry/stamps/${owner}?&include_metadata=false`,
            "useGitcoinUid"] : null,
        (url) => fetch(url, {
            headers: {
                "x-api-key": apikey
            }
        }).then((res) => res.json()), defaultSWRConfig)
    return { data }
}