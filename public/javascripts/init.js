$(window).load(function () {
	"use strict";
	$('#status').fadeOut();
	$('#preloader').delay(350).fadeOut('slow');
	$('body').delay(350).css({
		'overflow': 'visible'
	});
});

function getCookie(cname) {
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
}
return "";
}

var baseUrl = "http://hack-admin.herokuapp.com"

$(function () {
	"use strict";

	/* ---------------------------------------------------------
	* OAuth
	*/

	OAuth.initialize('QFIY4sIDBVFt2uVrEmUW4x5qc-E');

	/* ---------------------------------------------------------
	 * Background (Backstretch)
	 */

	// if(window.location.pathname == "/android.html") {
	// 	$.backstretch("/images/logo/hellowide.png");
	// } else {
		$.backstretch([
			"/images/background/1.jpg",
			"/images/background/2.jpg",
			"/images/background/3.jpg"
		], {duration: 3800, fade: 1500});
	// }

	/* ---------------------------------------------------------
	 * WOW
	 */

	new WOW().init();

	/* ---------------------------------------------------------
	 * Navbar
	 */

	var navToggleHeight = $(".section").first().offset();

	$("#ni-about").click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1200);
				return false;
			}
		}
	});

	$("#ni-team").click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1200);
				return false;
			}
		}
	});

	$("#ni-sponsors").click(function () {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top
			}, 1200);
			return false;
		}
	}
	});

	$("#ni-faq").click(function () {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top
			}, 1200);
			return false;
		}
	}
	});

	/* ---------------------------------------------------------
	 * Scroll arrow
	 */

	$("#scroll").click(function () {
	 	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	 		var target = $(this.hash);
	 		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	 		if (target.length) {
	 			$('html,body').animate({
	 				scrollTop: target.offset().top
	 			}, 1200);
	 			return false;
	 		}
	 	}
	 });

	/* ---------------------------------------------------------
	 * Hackathons
	 */

	$('.hackathon').hover(function(e) {
		$(this).find('.name').toggleClass('hover');
	});

	$('.hackathon').click(function(e) {
		var id = this.id;
		console.log("id: ", id);
		window.location.href = baseUrl + '/hackathons/' + id;
	});

	$('.status').change(function(e) {
		console.log("id: ", this.id);
		console.log("status: ")
	});

	/* ---------------------------------------------------------
	 * Countdown
	 */

	var description = {
		weeks: "weeks",
		days: "days",
		hours: "hours",
		minutes: "minutes",
		seconds: "seconds"
	};

	// year/month/day
	$('#countdown').countdown('2014/10/24', function (event) {
		$(this).html(event.strftime(
			'<div class="countdown-section"><b>%w</b> <span>' + description.weeks + '</span> </div>' +
			'<div class="countdown-section"><b>%d</b> <span>' + description.days + '</span> </div>' +
			'<div class="countdown-section"><b>%H</b> <span>' + description.hours + '</span> </div>' +
			'<div class="countdown-section"><b>%M</b> <span>' + description.minutes + '</span> </div>' +
			'<div class="countdown-section"><b>%S</b> <span>' + description.seconds + '</span> </div>'
		));
	});


	/* ---------------------------------------------------------
	 * Form validation
	 */

	/* Raffle */
	$('#raffle-btn').click(function() {
		var message = $('#raffle-input').val();
		var name = $('#brand').html();
		var notice = 'Are you sure you want to pick a raffle winner and text them this message?';
		var $raffle_btn = $('#raffle-btn');

		if(!confirm(notice + ' "' + message + '"')) {
			return false;
		}

		$raffle_btn.html('Sending...');

		console.log('message: ', message);
		console.log('name: ', name);

		var url = baseUrl + "/hackathons/" + name + "/raffle";

		$.post(url, {
			message: message
		})
		.done(function(res) {
			console.log("raffle response: ", res);
			$('#user').html('<img width="64" style="display:inline;border-radius: 32px" src="' + res.avatarURL + '"> <h2 style="margin-left:10px;display:inline">' + res.name + '</h2><h3>' + res.phone + '</h3><h3>' + res.email + '</h3><h3> github.com/' + res.userId + '</h3>');
			$raffle_btn.html('Sent!');
			setTimeout(function() {
				$raffle_btn.html('Raffle!');
			}, 2000);
		});
	});

	/* Announcements */
	$('#announce-btn').click(function() {
		var message = $('#announce-input').val();
		var name = $('#brand').html();
		var notice = 'Are you sure you want to send this message to all your hackers?';
		var $btn = $('#announce-btn');

		if(!confirm(notice + ' "' + message + '"')) {
			return false;
		}

		$btn.html('Sending...');

		console.log('message: ', message);
		console.log('name: ', name);

		var url = baseUrl + "/hackathons/" + name + "/announce";

		$.post(url, {
			message: message
		})
		.done(function(res) {
			console.log("announcement response: ", res);
			$btn.html('Sent!');
			setTimeout(function() {
				$btn.html('Send Announcement');
			}, 2000);
		});
	});

	/* Signup form */

	$('#signupForm').bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh'
		},
		submitHandler: function (validator, form, submitButton) {
			var l = Ladda.create(submitButton[0]),
				btnText = submitButton.children(".ladda-label");

			l.start();
			btnText.html("Signing up...");

			var escapedEmail = form.serialize().substring(6);
			var escapedHackathon = "Boilermake2014";
			var url = baseUrl + "/users/email";

			console.log("url", url);

			$.post(url, {
				email: escapedEmail,
				hackathon: escapedHackathon
			})
			.done(function(res) {
				console.log("email response: ", res);
				btnText.html(res);
			})
			.always(function() {
				l.stop();
				validator.disableSubmitButtons(true);
			});
		},
		fields: {
			email: {
				validators: {
					notEmpty: {
						message: 'Email cannot be empty'
					},
					emailAddress: {
						message: 'The input is not a valid email address'
					}
				}
			}
		}
	});

	function toggleConfirmed() {
		var message = '<p>Signed up. <br>' +
									'<a href="/android.html">Download the mobile app to find a team</a></p>';
		$('#signup').html(message);

		var message2 = 'Link sent! Click to resend.';
		$('#android-button').html(message2);
	}

	function parseNumber(number) {
		var parsed = "";
		for(var i=0; i < number.length; i++) {
			var char = number.substring(i, i+1);
			if(char.match(/\d/)) {
				parsed += char;
			}
		}
		if(parsed.length != 10) {
			return false;
		} else {
			return parsed;
		}
	}

	$('#github-button').click(function() {
		var number = $("#cell").val();
		var cell = parseNumber(number);
		if(!cell) {
			$("#cell-error").show().html("Wrong cell format");
			return false;
		}
		OAuth.popup('github', {state: "DontknowwhyyousaygoodbyeIsayhello"})
		.done(function(result) {
			//use result.access_token in your API request
			//or use result.get|post|put|del|patch|me methods (see below)
			var token = result.access_token
			console.log("token: ", token);
			document.cookie = "github_token=" + token;

			var url = baseUrl + "/users/login";

			$.post(url, { access_token: token }, function(user_id) {
				console.log("userId: ", user_id);
				document.cookie = "user_id=" + user_id;

				var url = baseUrl + "/users/phone";

				$.post(url, { user: user_id, phone: cell }, function(res) {
					console.log("phone response: ", res);
					document.cookie = "phone=" + cell;

					toggleConfirmed();
				});
			});
		})
		.fail(function (err) {
			//handle error with err
			alert(err);
		});
	});

	$('#github-admin-button').click(function() {
		OAuth.popup('github', {state: "DontknowwhyyousaygoodbyeIsayhello"})
		.done(function(result) {
			//use result.access_token in your API request
			//or use result.get|post|put|del|patch|me methods (see below)
			var token = result.access_token
			console.log("token: ", token);
			document.cookie = "github_token=" + token;

			var url = baseUrl + "/users/login";

			$.post(url, { access_token: token }, function(user_id) {
				console.log("userId: ", user_id);
				document.cookie = "user_id=" + user_id;
				window.location.href = baseUrl + '/admin/' + user_id;
			});
		})
		.fail(function (err) {
			//handle error with err
			alert(err);
		});
	});

	$('#android-button').click(function() {
		$('#android-button').html('Sending...');
		var cell = getCookie('phone');
		console.log("cell: ", cell);

		var url = baseUrl + "/users/text/android";

		$.post(url, { phone: cell }, function(res) {
			console.log("text android link response: ", res);

			toggleConfirmed();
		});
	});

	/* Contact form */

	$('#contactForm').bootstrapValidator({
		fields: {
			name: {
				validators: {
					notEmpty: {
						message: 'Name cannot be empty'
					},
					stringLength: {
						min: 6,
						max: 30,
						message: 'Name must be more than 6 and less than 30 characters long'
					},
					regexp: {
						regexp: /^[a-zA-Z\s]+$/,
						message: 'Name can only consist alphabetical characters'
					}
				}
			},
			contactEmail: {
				validators: {
					notEmpty: {
						message: 'Email cannot be empty'
					},
					emailAddress: {
						message: 'The input is not a valid email address'
					}
				}
			},
			message: {
				validators: {
					notEmpty: {
						message: 'Message cannot be empty'
					}
				}
			}
		},
		feedbackIcons: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh'
		},
		submitHandler: function (validator, form, submitButton) {
			var l = Ladda.create(submitButton[0]),
				btnText = submitButton.children(".ladda-label");

			l.start();
			btnText.html("Sending...");

			$.post(form.attr('action'), form.serialize(), function(result) {
				if(result.sent){
					btnText.html("Sent!");
				}
				else{
					btnText.html("Error!");
				}

				// Reset form after 5s
				setTimeout(function() {
					btnText.html("Submit");
					$(form[0])[0].reset();
					validator.resetForm();
				}, 5000);

			}, 'json')
			.always(function() {
				l.stop();
				validator.disableSubmitButtons(true);
			});
		},
	});
});
