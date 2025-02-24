import { DynamicBreadcrumbs } from "../../../components/ui/dynamic-breadcrumbs"

export const KardexProduct = () => {
    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
                <DynamicBreadcrumbs />
                kardex de hoy
        </div>
    )
}