function make_slides(f) {
  var slides = {};

  slides.bot = slide({
    name: "bot",
    start: function () {
      $('.err1').hide();
      $('.err2').hide();
      $('.disq').hide();
      exp.speaker = _.shuffle(["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"])[0];
      exp.listener = _.shuffle(["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Margaret"])[0];
      exp.lives = 0;
      var story = exp.speaker + ' dit à ' + exp.listener + ': "C\'est une belle journée, n\'est-ce pas ?"'
      var question = 'À qui parle ' + exp.speaker + ' ?';
      document.getElementById("s").innerHTML = story;
      document.getElementById("q").innerHTML = question;
    },
    button: function () {
      exp.text_input = document.getElementById("text_box").value;
      var lower = exp.listener.toLowerCase();
      var upper = exp.listener.toUpperCase();

      if ((exp.lives < 3) && ((exp.text_input == exp.listener) | (exp.text_input == lower) | (exp.text_input == upper))) {
        exp.data_trials.push({
          "slide_number_in_experiment": exp.phase,
          "ItemNumber": "bot_check",
          "response": [exp.text_input, exp.listener],
        });
        exp.go();
      }
      else {
        exp.data_trials.push({
          "slide_number_in_experiment": exp.phase,
          "ItemNumber": "bot_check",
          "response": [exp.text_input, exp.listener],
        });
        if (exp.lives == 0) {
          $('.err1').show();
        } if (exp.lives == 1) {
          $('.err1').hide();
          $('.err2').show();
        } if (exp.lives == 2) {
          $('.err2').hide();
          $('.disq').show();
          $('.button').hide();
        }
        exp.lives++;
      }
    },
  });

  slides.i0 = slide({
    name: "i0",
    start: function () {
      $("#n_trials").html(exp.n_trials);
      exp.startT = Date.now();
    }
  });

  slides.instructions_slider = slide({
    name: "instructions_slider",
    start: function () {
      $("#instrunctionGen").html('<table class=table1 id="instructionGen"> </table>');
      var dispRow = $(document.createElement('tr')).attr("id", 'rowp' + 1);
      dispRow.append("<div class=row>");
      dispRow.append("<div align=center><button class=continueButton onclick= _s.button()>Continue</button></div>");
      dispRow.append('<td/>');
      dispRow.append('</div>');
      dispRow.appendTo("#instructionGen");

    },
    button: function () {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  slides.example1 = slide({
    name: "example1",

    start: function () {
      $(".err").hide();
      $(".err_answer").hide();

      // var contexthtml = "<b>Speaker #1</b>: We need to promote this fundraiser as widely as possible. Do you have a list of the people involved in helping with outreach? <br> <b>Speaker #2 </b>: Yes, here it is. <br> <b>Speaker #1 </b>: "
      var entirehtml = "<font color=#FF0000> " + "Who can help spread the word?"
      contexthtml = entirehtml
      exp.QParaphrase.value = "Who is the person...?"
      exp.RParaphrase.value = "Who is a person...?"
      exp.AParaphrase.value = "Who is every person...?"

      for (i = 0; i < 3; i++) {
        $(`#sent1_${i + 1}`).text(exp.paraphraseArray[i].value)
      }

      var callback = function () {
        var total = ($("#slider1_1").slider("option", "value") +
          $("#slider1_2").slider("option", "value") +
          $("#slider1_3").slider("option", "value"));

        if (total > 1.0) {
          var other_total = total - $(this).slider("option", "value");
          $(this).slider("option", "value", 1 - other_total);
        }

        var perc = Math.round($(this).slider("option", "value") * 100);
        $("#" + $(this).attr("id") + "_val").val(perc);

      }
      utils.make_slider("#slider1_1", callback);
      utils.make_slider("#slider1_2", callback);
      utils.make_slider("#slider1_3", callback);

      for (i = 0; i < 3; i++) {
        $("#slider1_" + (i + 1)).slider("value", 0)
      }

      $(".context").html(contexthtml);

    }, //end start function

    button: function () {
      // this.response = response;
      console.log("clicked button")

      var total = ($("#slider1_1").slider("option", "value") +
        $("#slider1_2").slider("option", "value") +
        $("#slider1_3").slider("option", "value"));

      console.log("total: ", total)

      if (total < .99) {
        $(".err").show();
      } else {
        this.log_responses();
        exp.go()
      }
    },

    log_responses: function () {
      for (var i = 0; i < 3; i++) {
        exp.data_trials.push({
          "slide_number_in_experiment": exp.phase,
          "ItemNumber": "example1",
          "paraphrase": exp.paraphraseArray[i].name,
          "rating": $("#slider1_" + (i + 1)).slider("option", "value"),
          "order": exp.paraphraseArray[0].name + "-" + exp.paraphraseArray[1].name + "-" + exp.paraphraseArray[2].name,
        });
      }
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase,
        "ItemNumber": "example1",
        "paraphrase": "other",
        "rating": $("#slider1_4").slider("option", "value"),
        "order": exp.paraphraseArray[0].name + "-" + exp.paraphraseArray[1].name + "-" + exp.paraphraseArray[2].name,
      });
    } // end log_responses
  }); 


  slides.startExp = slide({
    name: "startExp",
    start: function () {
      $("#instrunctionGen").html('<table class=table1 id="instructionGen"> </table>');
      var dispRow = $(document.createElement('tr')).attr("id", 'rowp' + 1);
      dispRow.append("<div class=row>");
      dispRow.append("<div align=center><button class=continueButton onclick= _s.button()>Continue</button></div>");
      dispRow.append('<td/>');
      dispRow.append('</div>');
      dispRow.appendTo("#instructionGen");

    },
    button: function () {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  // test items
  slides.generateEntities = slide({
    name: "generateEntities",
    present: exp.stimuli, // This the array generated from stimuli.js
    present_handle: function (stim) { // this function is called bascially on exp.stim (more or less)
      $(".err").hide();
      // $("#str").prop("checked", false);

      var generic = stim;
      this.generic = generic;

      var contexthtml = generic.Intro + "<br>" + generic.SAPrompt_part1 + generic.SAPrompt_part2;
      // var contexthtml = "Test";
      var entirehtml =  "<br> VOUS : <font color=#FF0000>" + generic.Target + "<br> <font color=#000000> JORDAN : " + generic.Answer;

      contexthtml = contexthtml + entirehtml

      // contexthtml = contexthtml + 
      exp.QParaphrase.value = generic.QPara
      exp.RParaphrase.value = generic.RPara
      exp.AParaphrase.value = generic.APara

      for (i = 0; i < 3; i++) {
        $(`#sent5_${i + 1}`).text(exp.paraphraseArray[i].value)
      }

      // Make sure the values of the sliders sum to 1
      var callback = function () {

        var total = ($("#slider5_1").slider("option", "value") +
          $("#slider5_2").slider("option", "value") +
          $("#slider5_3").slider("option", "value"));
        // +$("#slider5_4").slider("option", "value")

        if (total > 1.0) {
          var other_total = total - $(this).slider("option", "value");
          $(this).slider("option", "value", 1 - other_total);
        }

        var perc = Math.round($(this).slider("option", "value") * 100);
        $("#" + $(this).attr("id") + "_val").val(perc);
      }

      utils.make_slider("#slider5_1", callback);
      utils.make_slider("#slider5_2", callback);
      utils.make_slider("#slider5_3", callback);
      // utils.make_slider("#slider5_4", callback);

      for (i = 0; i < 3; i++) {
        $("#slider5_" + (i + 1)).slider("value", 0)
      }

      $(".context").html(contexthtml);
    },

    button: function () {
      // this.response = response;
      console.log("clicked button")

      var total = ($("#slider5_1").slider("option", "value") +
        $("#slider5_2").slider("option", "value") +
        $("#slider5_3").slider("option", "value")); 
        // $("#slider5_4").slider("option", "value")

      console.log("total: ", total)
      console.log("slider1: ", $("#slider5_1").slider("option", "value"))
      console.log("slider2: ", $("#slider5_2").slider("option", "value"))

      if (total < .99) {
        $(".err").show();
      } else {
        this.log_responses();
        _stream.apply(this)
      }
    },

    log_responses: function () {
      for (var i = 0; i < 3; i++) {
        exp.data_trials.push({
          "slide_number_in_experiment": exp.phase,
          "ItemNumber": this.generic.ItemID,
          "paraphrase": exp.paraphraseArray[i].name,
          "rating": $("#slider5_" + (i + 1)).slider("option", "value"),
          "order": exp.paraphraseArray[0].name + "-" + exp.paraphraseArray[1].name + "-" + exp.paraphraseArray[2].name,
        });
      }
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase,
        "ItemNumber": this.generic.ItemID,
        "paraphrase": "other",
        // "rating": $("#slider5_3").slider("option", "value"),
        "rating": $("#slider5_4").slider("option", "value"),
        "order": exp.paraphraseArray[0].name + "-" + exp.paraphraseArray[1].name + "-" + exp.paraphraseArray[2].name,
      });
    }
  });


  slides.subj_info = slide({
    name: "subj_info",
    submit: function (e) {
      //ifFdata (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = _.extend({
        language: $("#language").val(),
        enjoyment: $("#enjoyment").val(),
        asses: $('input[name="assess"]:checked').val(),
        age: $("#age").val(),
        gender: $("#gender").val(),
        education: $("#education").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val(),
        comments: $("#comments").val(),
        paraArray: [exp.paraphraseArray[0].name, exp.paraphraseArray[1].name, exp.paraphraseArray[2].name]
      });
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name: "thanks",
    start: function () {
      exp.data = {
        "trials": exp.data_trials,
        "catch_trials": exp.catch_trials,
        "system": exp.system,
        "condition": exp.condition,
        "subject_information": exp.subj_data,
        "time_in_minutes": (Date.now() - exp.startT) / 60000
      };
      setTimeout(function () { proliferate.submit(exp.data); }, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {

  repeatWorker = false;
  //exp.n_entities = 1;
  exp.names = [];
  exp.all_names = [];
  exp.trials = [];
  exp.catch_trials = [];
  var stimuli = generate_stim(); // this calls a function in stimuli.js
  exp.QParaphrase = { name: "Quest" };
  exp.RParaphrase = { name: "Req" };
  exp.AParaphrase = { name: "Ass" };
  exp.paraphraseArray = _.shuffle([exp.QParaphrase, exp.RParaphrase, exp.AParaphrase]);
  console.log("paraarray: " + exp.paraphraseArray[1].value);
  console.log(stimuli.length);
  //exp.stimuli = _.shuffle(stimuli).slice(0, 15);
  exp.stimuli = stimuli.slice();
  exp.stimuli = _.shuffle(exp.stimuli);
  exp.n_trials = exp.stimuli.length;
  exp.stimcounter = 0;

  exp.stimscopy = exp.stimuli.slice();

  exp.system = {
    Browser: BrowserDetect.browser,
    OS: BrowserDetect.OS,
    screenH: screen.height,
    screenUH: exp.height,
    screenW: screen.width,
    screenUW: exp.width
  };
  //blocks of the experiment:
  exp.structure = [
    // "bot",
    "i0",
    "instructions_slider",
    // "example1",
    // "example2",
    // "example3",
    // "example4",
    // "startExp",
    "generateEntities",// This is where the test trials come in.
    // "subj_info",
    "thanks"
  ];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
  //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function () {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function () { $("#mustaccept").show(); });
      exp.go();
    }
  });

  exp.go(); //show first slide
}
