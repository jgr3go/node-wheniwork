export interface WhenIWorkOptions {
    logRequests?: boolean;
    logFn?: Function;
    accountId?: number;
}
export interface Shift {
    id: number;
    account_id: number;
    user_id: number;
    location_id: number;
    position_id: number;
    site_id: number;
    start_time: string;
    end_time: string;
    break_time: string;
    color: string;
    notes: string;
    instances: number;
    published: boolean;
    published_date: string;
    notified_at: string;
    created_at: string;
    updated_at: string;
    acknowledged: number;
    acknowledged_at: string;
    creator_id: number;
    is_open: boolean;
    alerted: boolean;
    actionable: boolean;
    block_id: number;
}
export interface Account {
    id: number;
    master_id: number;
    type: number;
    logo: string;
    company: string;
    subdomain: string;
    enabled: boolean;
    bad_credit_card: boolean;
    plan_expires: string;
    features: Array<any>;
    timezone_id: number;
    timezone_name: string;
    settings: any;
    place: Place;
}
export interface Place {
    business_name: string;
    address: string;
    place_id: string;
    place_type: string | string[];
    latitude: string | number;
    longitude: string | number;
}
export interface User {
    id: number;
    login_id: number;
    account_id: number;
    role: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    employee_code: string;
    activated: boolean;
    notes: string;
    hours_preferred: number;
    hours_max: number;
    hourly_rate: number;
    type: number;
    last_login: string;
    positions: Array<number>;
    locations: Array<number>;
    is_deleted: boolean;
    is_hidden: boolean;
    is_payroll: boolean;
    is_private: boolean;
    is_trusted: boolean;
    timezone_id: number;
    uuid?: string;
    alert_settings?: {
        [type: string]: Alert;
    };
    reminder_time?: number;
    sleep_start?: string;
    sleep_end?: string;
    is_onboarded?: boolean;
    hired_on?: string;
    terminated_at?: string;
    invited_at?: string;
    created_at?: string;
    updated_at?: string;
    is_active?: boolean;
    timezone_name?: string;
    avatar?: {
        url: string;
        size: string;
    };
}
export interface Alert {
    sms?: boolean;
    email?: boolean;
    alerts?: boolean;
    badge_icon?: boolean;
    in_app?: boolean;
}
export interface Position {
    id: number;
    account_id: number;
    name: string;
    color: string;
    sort: number;
    created_at: string;
    updated_at: string;
    updated_by: number;
    is_deleted: boolean;
}
export interface Location {
    id: number;
    account_id: number;
    is_default: number;
    name: string;
    address: string;
    coordinates: Array<any>;
    created_at: string;
    updated_at: string;
    sort: number;
    latitude: number;
    longitude: number;
    place_id: number;
    place_confirmed: boolean;
    ip_address: string;
    is_deleted: boolean;
    deleted_at: string;
    place: Place;
}
export interface Site {
    id: number;
    account_id: number;
    location_id: number;
    name: string;
    color: string;
    description: string;
    address: string;
    coordinates: [number, number];
    latitude: string;
    longitude: string;
    place_id: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    radius: number;
}
export interface Availability {
    id: number;
    account_id: number;
    user_id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    ongoing: boolean;
    repeat: number;
    created_at: string;
    updated_at: string;
}
export interface AvailabilityItem {
    id: number;
    availability_id: number;
    user_id: number;
    day: number;
    type: number;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
}
export interface Time {
    id: number;
    account_id: number;
    user_id: number;
    creator_id: number;
    position_id: number;
    location_id: number;
    site_id: number;
    shift_id: number;
    start_time: string;
    end_time: string;
    length: number;
    hourly_rate: number;
    is_alerted: boolean;
    alert_type: number;
    is_approved: boolean;
    modified_by: number;
    updated_at: string;
    created_at: string;
}
export interface Punch {
    id: number;
    account_id: number;
    time_id: number;
    user_id: number;
    location_id: number;
    site_id: number;
    type: number;
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number;
    ip_address: string;
    is_alerted: boolean;
    alert_type: number;
    method: number;
    method_name: string;
    notes: string;
    updated_at: string;
    created_at: string;
}
export interface Timezone {
    id: number;
    name: string;
    offset: number;
    olson_id: string;
}
export interface Block {
    id: number;
    account_id: number;
    location_id: number;
    position_id: number;
    start_time: string;
    end_time: string;
    notes: string;
    color: string;
    break_time: number;
    created_at: string;
    updated_at: string;
}
export interface Message {
    id: number;
    account_id: number;
    user_id: number;
    request_id: number;
    swap_id: number;
    type: number;
    content: string;
    created_at: string;
    updated_at: string;
    actor: number;
    conversation_id: number;
    title: string;
}
export interface Request {
    id: number;
    account_id: number;
    user_id: number;
    creator_id: number;
    updater_id: number;
    /** 0 = Pending, 1 = Canceled, 2 = Accepted, 3 = Expire */
    status: number;
    /** 0 = Unpaid Time Off, 1 = Paid Time Off, 2 = Sick Leave, 3 = Holiday */
    type: number;
    hours: number;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
    canceled_by: number;
    split_time: any;
    user_status: number;
    allowed_statuses: number[];
}
export interface Swap {
    id: number;
    account_id: number;
    user_id: number;
    /** 1 = swap, 2 = drop, 3 = alert */
    type: number;
    /** 0 = Pending, 1 = Approved, 2 = Declined, 3 = Completed, 4 = Canceled, 5 = Expired */
    status: number;
    accepted_id: number;
    statuses: number[];
}
export interface Template {
    id: number;
    account_id: number;
    location_id: number;
    user_id: number;
    start_date: string;
    end_date: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}
export interface ListShiftParameters {
    start?: string;
    end?: string;
    user_id?: number | string;
    location_id?: number | string;
    include_open?: boolean;
    include_allopen?: boolean;
    include_onlyopen?: boolean;
    unpublished?: boolean;
    deleted?: boolean;
}
export interface ListShiftsResponse {
    start: string;
    end: string;
    shifts: Shift[];
    users: User[];
    locations: Location[];
    positions: Position[];
    sites: Site[];
}
export interface ListUsersParameters {
    ids?: string;
    location_id?: number | string;
    show_deleted?: boolean;
}
export interface ListUsersResponse {
    users: User[];
    locations: Location[];
    positions: Position[];
}
export interface ListPositionsParameters {
    show_deleted?: boolean;
}
export interface ListPositionsResponse {
    positions: Position[];
}
export interface ListLocationsParameters {
}
export interface ListLocationsResponse {
    locations: Location[];
}
export interface ListSitesParameters {
    include_deleted?: boolean;
}
export interface ListSitesResponse {
    sites: Site[];
}
export interface ListAvailabilitiesParameters {
    user_id?: number | string;
}
export interface ListAvailabilitiesResponse {
    availabilities: Availability[];
}
export interface ListAvailabilityItemsParameters {
    user_id: number | string;
    start: string;
    end: string;
}
export interface ListAvailabilityItemsResponse {
    availabilityitems: AvailabilityItem[];
}
export interface ListTimesParameters {
    start?: string;
    end?: string;
    user_id?: number;
}
export interface ListTimesResponse {
    start: string;
    end: string;
    times: Time[];
    punches: Punch[];
    shifts: Shift[];
    users: User[];
    locations: Location[];
    positions: Position[];
    sites: Site[];
}
export interface ListTimezonesParameters {
}
export interface ListTimezonesResponse {
    timezones: Timezone[];
}
export interface ListBlocksParameters {
}
export interface ListBlocksResponse {
    blocks: Block[];
}
export interface ListRequestsParameters {
    start?: string;
    end?: string;
    since_id?: number;
    max_id?: number;
    user_id?: number;
    status?: number;
    limit?: number;
    page?: number;
    include_deleted_users?: boolean;
}
export interface ListRequestsResponse {
    messages: Message[];
    total: number;
    page: number;
    more: boolean;
    requests: Request[];
    users: User[];
}
export interface ListSwapsParameters {
    open_only?: boolean;
    user_id?: number | string;
    shift_id?: number | string;
    status?: number | string;
    type?: number | string;
    start?: string;
    end?: string;
    limit?: number;
    page?: number;
}
export interface ListSwapsResponse {
    messages: Message[];
    swaps: Swap[];
    total: number;
    page: number;
    more: boolean;
    shifts: Shift[];
    users: User[];
    locations: Location[];
    positions: Position[];
    sites: Site[];
}
export interface ListMessagesParameters {
    swap_id?: number;
    request_id?: number;
    conversation_id?: number;
}
export interface ListMessagesResponse {
    messages: Message[];
}
export interface ListTemplatesParameters {
}
export interface ListTemplatesResponse {
    templates: Template[];
    templateshifts: Shift[];
}
