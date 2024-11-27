export interface Response<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface PatchData<T> {
    id: number | string;
    data: Partial<T>;
}

export interface BaseQueryParams {
    offset: number;
    limit: number;
}

export type CapacityCategory = "Rollforming" | "Trim";

export interface ShipDate {
    ship_date: string;
}
export type EBMSOrdersPatchData = PatchData<ShipDate>;

export interface Capacity {
    capacity: number | null;
    total_capacity: number | null;
}

interface CommentsData {
    id: number;
    user: any;
    item: string;
    text: string;
    created_at: string;
}

export interface SalesOrdersData {
    id: number;
    order: string;
    priority: {
        name: string;
        color: string;
        position: number;
        id: number;
    };
    packages: number;
    location: number;
    production_date: string | null;
    assigned: boolean;
    release_to_production: boolean;
    cutting_complete: boolean;
}
export interface MFGData {
    c_mfg: number;
}

export type MFGPatchData = PatchData<MFGData> & {
    origin_order: string;
};

export interface OrdersData {
    id: string;
    invoice: string;
    customer: string;
    sales_order: SalesOrdersData;
    origin_items: EBMSItemsData[];
    start_date: string;
    end_date: string;
    ship_date: string;
    c_name: string;
    c_city: string;
    crea_date: string;
    count_items: number;
    completed: boolean;
}

export type OrdersResponse = Response<OrdersData>;

export interface EBMSItemData {
    id: string;
    category: string;
    description: string;
    quantity: string;
    shipped: string;
    ship_date: string;
    width: string;
    weight: string;
    length: string;
    bends: string;
    customer: string;
    order: string;
    id_inven: string;
    origin_order: string;
    completed: boolean;
    profile: string;
    color: string;
    gauge: string;
    item: {
        id: number;
        order: number;
        origin_item: string;
        flow: {
            id: number;
            name: string;
            description?: string;
            position?: number;
            category: string;
            created_at?: string;
            stages: {
                id: number;
                name: string;
                description?: string;
                position: number;
                default?: boolean;
                color: string;
                flow?: number;
                item_ids: number[];
            };
        };
        production_date: string;
        time: string;
        packages: number;
        location: number;
        priority: {
            name: string;
            color: string;
            position: number;
            id: number;
        };
        comments: CommentsData[];
        stage: {
            id: number;
            name: string;
            description?: string;
            position: number;
            default?: boolean;
            color: string;
            flow?: number;
            item_ids: number[];
        } | null;
    };
    production_date: string;
    priority: number;
    c_type: number;
    c_mfg: number;
    on_hand: number;
    comments: CommentsData[];
}
export interface EBMSItemsData extends EBMSItemData {
    cutting_items: EBMSItemData[];
}

export type EBMSItemsResponse = Response<EBMSItemsData>;

export interface OrdersQueryParams extends BaseQueryParams {
    invoice: number;
    name: string;
    date: string;
    category: string;
    is_scheduled: boolean | null;
    created_at: string;
    categories: string;
    over_due: boolean;
    completed: boolean | null;
    search: string | null;
    ordering: string;
    release_to_production: boolean;
    stage_id: number | null;
    flow_id: number | null;
    category__prod_type: string;
    flow: string;
    flow_ids: string;
    has_comments: boolean | null;
    status_not_in: string;
    timedelta: number;
    date_range: string;
    flow_id__isnull: boolean;
    stage_id__isnull: boolean;
    status: string;
    priority: number;
    cutting_complete: boolean;
    assigned: boolean;
    production_date__isnull: boolean;
    quantity: number;
    width: number;
    length: number;
    weight: number;
    bends: number;
    autoid__not_in: string;
    autoid__in: string;
    order: string;
    order_by: string;
}

export interface OrderQueryParams extends BaseQueryParams {
    id: number;
    category: string;
    autoid: string;
}
export interface OrderItemsQueryParams extends BaseQueryParams {
    id: number;
    category: string;
}
export interface EBMSItemsQueryParams extends BaseQueryParams {
    quan: number;
    weight: number;
    date_range: string;
    search: string;
    ordering: string;
    width: string;
    widthd: number;
    over_due: boolean;
    height: string;
    completed: boolean;
    heightd: number;
    ship_date: string;
    order: string;
    is_scheduled: boolean | null;
    category: string | null;
    production_date: string;
    has_comment: boolean;
    flow: string;
    flow_id: string | null;
    flow_ids: string;
    stage_id: string | null;
}
