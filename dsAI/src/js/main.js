class GameConsole {
	constructor(container) {}

	message(msg, args) {
		for (var i = 0; i < args.length; i++) msg.push(args[i]);
		return msg;
	}

	info() {
		var msg = this.private.message(
			["і", this.private.scheme(this.private.colors.blue)],
			arguments
		);
		this.private.log.apply(null, msg);
	}

	warn() {
		var msg = this.private.message(
			["◬", this.private.scheme(this.private.colors.orange)],
			arguments
		);
		this.private.log.apply(null, msg);
	}

	pass() {
		var msg = this.private.message(
			["✓", this.private.scheme(this.private.colors.green)],
			arguments
		);
		this.private.log.apply(null, msg);
	}

	fail() {
		var msg = this.private.message(
			["!", this.private.scheme(this.private.colors.red)],
			arguments
		);
		this.private.log.apply(null, msg);
	}

	go() {
		var msg = this.private.message(
			["→", this.private.scheme(this.private.colors.gray)],
			arguments
		);
		this.private.log.apply(null, msg);
	}
}

// let post = new Post("і","info","")
// let post = new Post("◬","warn","")
// let post = new Post("✓","pass","")
// let post = new Post("!","fail","")
// let post = new Post("→","go","")

class Post {
	constructor(symbol, type, message) {
		this.colors = {
			red: "#EC5f67",
			orange: "#F99157",
			green: "#81CC79",
			blue: "#6699CC",
			gray: "#555",
			white: "#f9f9f9",
		};
		this.symbol = symbol;
		this.message = message;
		this.schemeObj = this.scheme(this.typeToColor(type));
	}

	typeToColor(type) {
		if (type === "info") {
			return this.colors.gray;
		} else if (type === "warn") {
			return this.colors.orange;
		} else if (type === "pass") {
			return this.colors.green;
		} else if (type === "fail") {
			return this.colors.red;
		} else if (type === "go") {
			return this.colors.white;
		}
	}

	scheme(color) {
		let line_height = "line-height: 16px;",
			// title-specific styles
			title_color = "color: " + this.colors.white + ";",
			title_background = "background-color: " + color + ";",
			title_font = "font-size: 14px;" + line_height,
			title_block = "padding: 2px 8px; border-radius: 3px;",
			title_style = title_color + title_background + title_font + title_block,
			// basic text styles
			text_color = "color: " + color + ";",
			text_padding = "padding: 4px 4px;", // vertical needs to match title for vertical centering
			text_font = "font-size: 11px;" + line_height,
			text_style = text_font + text_color + text_padding,
			// universal styles
			bold = "font-weight: bold;";

		var scheme = {
			title: title_style,
			content: text_style,
			integer: text_style + bold,
		};

		// return scheme
		return scheme;
	}

	log() {
		var args = arguments,
			// color scheme variables
			title = args[0],
			scheme = args[1],
			// collections to be combined in output
			msg = [],
			strs = "",
			data = [];

		// for each remaining argument
		for (var i = 2; i <= args.length - 1; i++) {
			// if a string, we want to add it after title and add color
			if (typeof args[i] != "object") {
				// create the string
				var str = "%c" + args[i];
				// add string to our strings
				strs += str;

				// if not a string, it is integer or boolean and we want to style it differently
				if (typeof args[i] != "string") {
					msg.push(scheme.integer);
				} else {
					msg.push(scheme.content);
				}
			} else {
				data.push(args[i]);
			}
		}

		// the log that matters
		if (msg.length > 0) {
			var msg = ["%c" + title + strs, scheme.title].concat(msg);
			console.log.apply(console, msg);
		}

		// log objects, arrays, html etc if exists
		if (data.length > 0) {
			if (msg.length == 0) {
				var title = ["%c" + title + "%cdata →", scheme.title, scheme.integer];
				console.log.apply(console, title);
			}
			console.log.apply(console, data);
		}
	}
}

const gameConsoleDom = document.getElementById("gameConsole");
// const gameConsole = new GameConsole(gameConsoleDom);
