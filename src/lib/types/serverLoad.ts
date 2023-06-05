export interface LayoutServerLoadParams {
	request: {
		headers: Map<string, string>
	}
}

export interface LayoutServerLoadReturn {
	token?: string
}

export interface ServerLoadParams {
	parent: () => Promise<LayoutServerLoadReturn>
}