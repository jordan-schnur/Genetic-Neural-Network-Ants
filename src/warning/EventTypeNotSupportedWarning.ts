import Warning from "./Warning";

export default function EventTypeNotSupportedWarning(eventName: string, className: string, trace: boolean = false) {
	Warning(eventName + " is not an event supported by " + className + ".", trace);
}
