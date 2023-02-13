import {useEffect, useState} from "react";
import {Alert, Card, Spinner} from "react-bootstrap";
import {Formik, Form} from "formik";
import {useGetKrakenAssetPairs} from "../../api/modules/Kraken";
import TextInput from "../../components/formikInputs/textInput";
import SelectInput from "../../components/formikInputs/selectInput";
import {useRouter} from "next/router";
import Image from "next/image";

const CURRENCY_OPTIONS = [
    {
        value: "USDT", label: "USDT",
    },
    {
        value: "EUR", label: "EUR",
    },
    {
        value: "GBP", label: "GBP",
    }
]

const CRYPTO_OPTIONS = [
    {
        value: "BTC", label: "BTC",
    },
    {
        value: "ETH", label: "ETH",
    },
    {
        value: "DOGE", label: "DOGE",
    },
    {
        value: "ADA", label: "ADA",
    },
    {
        value: "MANA", label: "MANA",
    },
]

interface FormValues {
    currency: string,
    crypto: string,
    amount: string
}

// Totally misunderstood the whole task and went in a wrong direction. I decided not deleting it
// and let it stay just for a different example. /kraken2 is the right path.

const Kraken = () => {
    const router = useRouter()
    const [cryptoOption, setCryptoOption] = useState<string>(CRYPTO_OPTIONS[0].value);
    const [currencyOption, setCurrencyOption] = useState<string>(CURRENCY_OPTIONS[0].value);
    const [amount, setAmount] = useState<string>("1");

    const cryptoOptionFromUrl =
        typeof router.query?.crypto === "string" ? router.query.crypto : "";
    const currencyOptionFromUrl =
        typeof router.query?.currency === "string" ? router.query.currency : "";

    useEffect(() => {
        if (router.isReady) {
            router.replace({
                query: { ...router.query, crypto: cryptoOption, currency: currencyOption },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cryptoOption, currencyOption]);


    useEffect(() => {
        if (cryptoOptionFromUrl && CRYPTO_OPTIONS.some(value => value.value == cryptoOptionFromUrl))
        setCryptoOption(cryptoOptionFromUrl)
        if (currencyOptionFromUrl && CURRENCY_OPTIONS.some(value => value.value == currencyOptionFromUrl))
        setCurrencyOption(currencyOptionFromUrl)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady])

    const {data, isLoading, error, isError, dataUpdatedAt} = useGetKrakenAssetPairs({cryptoOption, currencyOption})

    let price = 0;
    if (data && data.result && data.result[`${cryptoOption}/${currencyOption}`] && data.result[`${cryptoOption}/${currencyOption}`].c) {
        price = Number(data.result[`${cryptoOption}/${currencyOption}`].o) * Number(amount);
    }
    const lastUpdate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(dataUpdatedAt)

    return (
        <div className='container'>
            <div className='row text-center'>
                <div className='col-xs-6'>
                    <Image
                       alt="Nexo Logo"
                       width={250}
                       height={150}
                       src={"data:image/png;base64,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"}/>
                </div>
            </div>
            <div className='row'>
                <div className='col-xs-8'>
                    <Card className='p-4'>
                        <Card.Title className="text-center">
                            <Card.Title>
                                Crypto Exchange App
                            </Card.Title>
                        </Card.Title>
                        <Card.Body>
                        <Formik<FormValues>
                            initialValues={{
                                currency: currencyOption,
                                crypto: cryptoOption,
                                amount: amount
                            }}
                            onSubmit={() => {
                            }}
                            enableReinitialize={true}
                            validate={(values) => {
                                setCryptoOption(values.crypto)
                                setAmount(values.amount)
                                setCurrencyOption(values.currency)
                            }}
                        >
                            {({values}) => (
                                <Form>
                                    <div className='row'>
                                        <div className="col-md-5">
                                            <SelectInput
                                                label="Crypto"
                                                options={CRYPTO_OPTIONS}
                                                name="crypto"
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <SelectInput
                                                label="Currrency"
                                                options={CURRENCY_OPTIONS}
                                                name="currency"
                                            />
                                        </div>
                                        <div className='col-md-2'>
                                            <TextInput label="Amount" name="amount" type='number' onChange={setAmount}/>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="text-center col">
                                                {
                                                    isError &&
                                                    <Alert variant="danger">An error occurred: {error.message}</Alert>
                                                }
                                                {
                                                    !isError && !isLoading && !(Number(values.amount) > 0) &&
                                                    <div>Please enter a valid amount</div>
                                                }
                                                {
                                                    !isError && isLoading && <Spinner animation="border"/>
                                                }
                                                {
                                                    !isError && !isLoading && (Number(values.amount) > 0) && (
                                                        <div>
                                                            <div className='mb-2'>
                                                            {amount} {cryptoOption}/{currencyOption} = <b>${price.toFixed(2)}</b> USD
                                                            </div>
                                                            <div>
                                                            <small>
                                                                Updated at:
                                                            </small>
                                                            </div>
                                                            <div>
                                                            <small>
                                                              {lastUpdate}
                                                            </small>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Kraken


