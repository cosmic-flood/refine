import {
    useTranslate,
    IResourceComponentsProps,
    useTable,
} from "@pankod/refine-core";
import { Grid } from "@pankod/refine-mui";

import { ProductItem } from "components";

import { IProduct } from "interfaces";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { tableQueryResult, setPageSize } = useTable<IProduct>({
        resource: "products",
    });

    console.log("table", tableQueryResult);

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {tableQueryResult.data?.data.map((i: IProduct) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={i.id}>
                        <ProductItem
                            name={i.name}
                            key={i.id}
                            images={i.images}
                            price={i.price}
                            id={i.id}
                            description={i.description}
                            isActive={i.isActive}
                            createdAt={i.createdAt}
                            category={i.category}
                            stock={i.stock}
                        />
                    </Grid>
                ))}
            </Grid>
            <button onClick={() => setPageSize((prev) => prev + 10)}>
                load more
            </button>
        </>
    );
};