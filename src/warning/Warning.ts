export default function Warning(warnText: string, trace: boolean = false) {
	if ( trace ) {
		let err = new Error();
		console.log(warnText, err.stack);
	} else {
		console.warn(warnText);
	}
}
