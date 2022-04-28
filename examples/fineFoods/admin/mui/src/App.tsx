import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { useTranslation } from "react-i18next";

import {
    AddShoppingCartOutlined,
    StarBorderOutlined,
} from "@mui/icons-material";

import { authProvider } from "authProvider";
import { OrderList, OrderShow } from "pages/orders";
import { ReviewsList } from "pages/reviews";

const App: React.FC = () => {
    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.finefoods.refine.dev")}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            ReadyPage={ReadyPage}
            Layout={Layout}
            LoginPage={LoginPage}
            catchAll={<ErrorComponent />}
            syncWithLocation
            warnWhenUnsavedChanges
            resources={[
                {
                    name: "orders",
                    list: OrderList,
                    show: OrderShow,
                    icon: <AddShoppingCartOutlined />,
                },
                {
                    name: "reviews",
                    list: ReviewsList,
                    icon: <StarBorderOutlined />,
                },
            ]}
        />
    );
};

export default App;
