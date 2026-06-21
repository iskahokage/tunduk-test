import {FC, ReactNode} from "react";
import {Provider} from "react-redux";
import {store} from "@/store";
import {Toaster} from "sonner";
import {MemoryRouter} from "react-router-dom";

const AllTheProviders: FC<{ children: ReactNode }> = ({children}) => {
    return (
        <Provider store={store}>
            <Toaster/>
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </Provider>
    );
};
export default AllTheProviders;
