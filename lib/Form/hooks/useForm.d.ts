export declare class FormStore {
    private forceRootUpdate;
    private store;
    private initialValues;
    private subscribable;
    constructor(forceRootUpdate: () => void);
    private setInitialValues;
    private setValidateSubList;
    private unValidateSubList;
    getForm: () => {
        getFieldsValue: () => {};
        setFieldsValue: (store: any) => void;
        validateFields: (arr: string[]) => Promise<unknown>;
        getInternalHooks: () => {
            setInitialValues: (initialValues: any, init: boolean) => void;
            setValidateSubList: (name: any, valid: any) => void;
            unValidateSubList: (name: any) => void;
        };
    };
    private getInternalHooks;
    private getFieldsValue;
    private setFieldsValue;
    private promiseAll;
    private validateFields;
    private notifyObservers;
}
export default function useForm(form?: any): any[];
