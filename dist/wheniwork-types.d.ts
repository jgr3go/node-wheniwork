export interface WhenIWorkOptions {
    logRequests?: boolean;
    logFn?: Function;
    errorFn?: Function;
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
}
export interface Position {
    id: number;
    account_id: number;
    name: string;
    color: string;
    created_at: string;
    updated_at: string;
}
export interface Location {
    id: number;
    name: string;
    address: string;
    coordinates: Array<any>;
    created_at: string;
    updated_at: string;
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
    coordinates: Array<any>;
    latitude: string;
    longitude: string;
    place_id: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: boolean;
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
