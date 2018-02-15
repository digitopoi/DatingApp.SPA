import { Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy } from "@angular/core";
@Pipe({
// tslint:disable-next-line:indent
	name: 'timeAgo',
	pure: false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
// tslint:disable-next-line:indent
	private timer: number;
	constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) { }
// tslint:disable-next-line:indent
	transform(value: string) {
		this.removeTimer();
// tslint:disable-next-line:indent
		const d = new Date(value);
		const now = new Date();
// tslint:disable-next-line:indent
		const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
		const timeToUpdate = this.getSecondsUntilUpdate(seconds) * 1000;
// tslint:disable-next-line:indent
		this.timer = this.ngZone.runOutsideAngular(() => {
			if (typeof window !== 'undefined') {
// tslint:disable-next-line:indent
				return window.setTimeout(() => {
					this.ngZone.run(() => this.changeDetectorRef.markForCheck());
// tslint:disable-next-line:indent
			}, timeToUpdate);
			}
// tslint:disable-next-line:indent
			return null;
		});
// tslint:disable-next-line:indent
		const minutes = Math.round(Math.abs(seconds / 60));
		const hours = Math.round(Math.abs(minutes / 60));
// tslint:disable-next-line:indent
		const days = Math.round(Math.abs(hours / 24));
		const months = Math.round(Math.abs(days / 30.416));
// tslint:disable-next-line:indent
		const years = Math.round(Math.abs(days / 365));
		if (seconds <= 45) {
// tslint:disable-next-line:indent
			return 'a few seconds ago';
		} else if (seconds <= 90) {
// tslint:disable-next-line:indent
			return 'a minute ago';
		} else if (minutes <= 45) {
// tslint:disable-next-line:indent
			return minutes + ' minutes ago';
		} else if (minutes <= 90) {
// tslint:disable-next-line:indent
			return 'an hour ago';
		} else if (hours <= 22) {
// tslint:disable-next-line:indent
			return hours + ' hours ago';
		} else if (hours <= 36) {
// tslint:disable-next-line:indent
			return 'a day ago';
		} else if (days <= 25) {
// tslint:disable-next-line:indent
			return days + ' days ago';
		} else if (days <= 45) {
// tslint:disable-next-line:indent
			return 'a month ago';
		} else if (days <= 345) {
// tslint:disable-next-line:indent
			return months + ' months ago';
// tslint:disable-next-line:indent
		} else if (days <= 545) {
			return 'a year ago';
// tslint:disable-next-line:indent
		} else { // (days > 545)
			return years + ' years ago';
// tslint:disable-next-line:indent
		}
	}
// tslint:disable-next-line:indent
	ngOnDestroy(): void {
		this.removeTimer();
// tslint:disable-next-line:indent
	}
	private removeTimer() {
// tslint:disable-next-line:indent
		if (this.timer) {
			window.clearTimeout(this.timer);
// tslint:disable-next-line:indent
			this.timer = null;
		}
// tslint:disable-next-line:indent
	}
	private getSecondsUntilUpdate(seconds: number) {
// tslint:disable-next-line:indent
		const min = 60;
		const hr = min * 60;
// tslint:disable-next-line:indent
		const day = hr * 24;
		if (seconds < min) { // less than 1 min, update ever 2 secs
// tslint:disable-next-line:indent
			return 2;
		} else if (seconds < hr) { // less than an hour, update every 30 secs
// tslint:disable-next-line:indent
			return 30;
		} else if (seconds < day) { // less then a day, update every 5 mins
// tslint:disable-next-line:indent
			return 300;
		} else { // update every hour
// tslint:disable-next-line:indent
			return 3600;
		}
// tslint:disable-next-line:indent
	}
}
