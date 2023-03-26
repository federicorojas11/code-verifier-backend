/**
 * Basic JSON response for controllers
 */

export type BasicResponse = {
     message: string;
     status: number;
};

/**
 * Basic JSON response with date for controllers
 */

export type BasicDateResponse = {
     message: string;
     date: Date;
};

/**
 * Error JSON response for controllers
 */
export type ErrorResponse = {
     error: string;
     message: string;
};
