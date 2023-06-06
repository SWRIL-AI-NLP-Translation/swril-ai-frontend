export interface GraphQLError {
	message: string;
}

export interface GraphQLe<T=null> {
	response: {
		data: T;
		errors: GraphQLError[];
	}
}