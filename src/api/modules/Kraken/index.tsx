import {useQuery} from "react-query";
import axios, {AxiosError} from "axios";
import {KrakenData} from "./types";


export const useGetKrakenAssetPairs = ({
                                           cryptoOption,
                                           currencyOption,
                                       }: {
    cryptoOption: string,
    currencyOption: string,

}) =>
    useQuery<KrakenData, AxiosError, KrakenData>(
        [`kraken_${cryptoOption}_${currencyOption}`],
        async () => {
            const res = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${cryptoOption}/${currencyOption}`);
            return res.data;
        },
        {
            refetchInterval: 20000,
        }
    );

export const useGetKrakenAssetPairsNew = ({
                                              cryptoPair,
                                       }: {
    cryptoPair: string,
}) =>
    useQuery<KrakenData, AxiosError, KrakenData>(
        [`kraken_${cryptoPair}`],
        async () => {
            const res = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${cryptoPair}`);
            return res.data;
        },
        {
            refetchInterval: 20000,
        }
    );
