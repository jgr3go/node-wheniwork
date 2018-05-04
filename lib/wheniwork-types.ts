

export type WhenIWorkOptions = {
  logRequests?: boolean;
  logFn?: Function;
  errorFn?: Function;
  accountId?: number;
};

export type Shift = {
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
  // 0 for false, 1 for true
  acknowledged: number;
  acknowledged_at: string;
  creator_id: number;
  is_open: boolean;
};

export type Account = {
  id: number;
  master_id: number;
  // 1 = Scheduling, 2 = Attendance, 3 = Both
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

export type Place = {
  business_name: string;
  address: string;
  place_id: string;
  place_type: string|string[];
  latitude: string|number;
  longitude: string|number;
};

export type User = {
  id: number;
  login_id: number;
  account_id: number;
  // 1 = Admin, 2 = Manager, 3 = Employee, 4 = Lead, 5 = Supervisor
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
  // 1 = hourly, 2 = salaried, 4 = exempt from overtime
  type: number;
  last_login: string;
  positions: Array<number>;
  locations: Array<number>;
  is_deleted: boolean;
  is_hidden: boolean;
  is_payroll: boolean;
  is_private: boolean;
  is_trusted: boolean;
};

export type Position = {
  id: number;
  account_id: number;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
};

export type Location = {
  id: number;
  name: string;
  address: string;
  coordinates: Array<any>;
  created_at: string;
  updated_at: string;
  place: Place;
};

export type Site = {
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
};

export type Availability = {
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
};

export type AvailabilityItem = {
  id: number;
  availability_id: number;
  user_id: number;
  // 0-6 
  day: number;
  // 1 = Unavailable, 2 = Preferred
  type: number;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
};

export type Time = {
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
};

export type Punch = {
  id: number;
  account_id: number;
  time_id: number;
  user_id: number;
  location_id: number;
  site_id: number;
  // 1 = IN, 2 = OUT
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
};

export type Timezone = {
  id: number;
  name: string;
  offset: number;
  olson_id: string;
};




export type ListShiftParameters = {
  start?: string;
  end?: string;
  user_id?: number|string;
  location_id?: number|string;
  include_open?: boolean;
  include_allopen?: boolean;
  include_onlyopen?: boolean;
  unpublished?: boolean;
  deleted?: boolean;
};

export type ListShiftsResponse = {
  start: string;
  end: string;
  shifts: Shift[];
  users: User[];
  locations: Location[];
  positions: Position[];
};

export type ListUsersParameters = {
  ids?: string;
  location_id?: number|string;
  show_deleted?: boolean;
};

export type ListUsersResponse = {
  users: User[];
  locations: Location[];
  positions: Position[];
};

export type ListPositionsParameters = {
  show_deleted?: boolean;
};

export type ListPositionsResponse = {
  positions: Position[];
};

export type ListLocationsParameters = {

};

export type ListLocationsResponse = {
  locations: Location[];
};

export type ListSitesParameters = {
  include_deleted?: boolean;
};

export type ListSitesResponse = {
  sites: Site[];
};

export type ListAvailabilitiesParameters = {
  user_id?: number|string;
};

export type ListAvailabilitiesResponse = {
  availabilities: Availability[];
};

export type ListAvailabilityItemsParameters = {
  user_id: number|string;
  start: string;
  end: string;
};

export type ListAvailabilityItemsResponse = {
  availabilityitems: AvailabilityItem[];
};

export type ListTimesParameters = {
  start?: string;
  end?: string;
  user_id?: number;
};

export type ListTimesResponse = {
  start: string;
  end: string;
  times: Time[];
  punches: Punch[];
  shifts: Shift[];
  users: User[];
  locations: Location[];
  positions: Position[];
  sites: Site[];
};

export type ListTimezonesParameters = {

};

export type ListTimezonesResponse = {
  timezones: Timezone[];
};