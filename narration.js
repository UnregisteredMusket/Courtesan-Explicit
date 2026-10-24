/*
  NARRATION INDEX — Medieval Courtesan
  ------------------------------------
  Every line the game uses to describe an encounter lives here, so you can
  rewrite, add or remove lines without touching game logic.

  HOW A TURN IS BUILT
    1. start     If you switched into a technique, its "start" line sets the pose.
    2. main      The technique's own success / fail / repeat line.
                 "Push harder" uses the technique's "focus" line on success.
                 Tease, Pull back and Command use the approaches lists.
                 Techniques without their own lines fall back to skills[skill].
    2b. high     On a success once the client is close (high band), a technique's
                 "high" line replaces its success line.
    3. pref      If the client loves the technique, an extra "liked" line follows.
                 If they dislike it, a "disliked" line replaces the success line.
    4. reaction  reactions[low|mid|high][success|fail], by how close they are.
  A line never repeats until the rest of its list has been used.

  Every technique in INDEX (index.html) has its own entry below, written to
  match its pose and setting, so lines never contradict each other (no "the
  bed creaks" against a wall, no "face to face" from behind). Fallback and
  reaction lines are deliberately pose-neutral so they fit after anything.

  POSE TAGS
    A technique can list tags (e.g. tags: ["bound"]). Any line written as
    { t: "text", not: ["bound"] } is skipped while a technique with that tag
    is in use. Tags in use: away (facing away), bound (wrists tied),
    notouch (client may not touch).

  TOKENS
    {name}    your character's name
    {client}  the client: "Marlow", "your client", "the patron"
    {Client}  same, capitalized — use at the start of a sentence
    {they} {them} {their} {themself}   client pronouns (capitalize for sentence starts)
    {s}       verb ending after {they}:  "{they} want{s}"  → "he wants"
    {es}      for -es verbs:             "{they} blush{es}" → "he blushes"
    {are}     "{they} {are}"             → "she is"
    {move}    the current technique's name
    {other}   in group encounters, another guest's name
    {garment} {lower} {lace}   the client's clothes: gown / skirts / bodice laces,
                               or shirt / breeches / doublet laces
  Tips: make {client} the subject when the verb ends in -es ("{client}
  watches"), and use a pronoun ({They}) for reaction lines, since the
  main line has usually just named the client.
*/
window.NARRATION = {

  /* Opening line when an encounter begins, by where you work. */
  open: {
    street: [
      "You lead {client} through a low doorway into a rented room and pull the latch. The bed is narrow but you've fucked on worse.",
      "Behind a curtain in the back of a cookshop, on a cot piled with blankets, {client} watches you unlace your bodice one eyelet at a time, {cock} already hard through {their} breeches.",
      "Up a crooked stair to a room with one guttering candle. {Client} shuts the door, and you drop to your knees before {they} can even ask."
    ],
    brothel: [
      "Your room upstairs is warm and lamplit. {Client} lingers in the doorway until you take {their} hand and press it between your thighs to show {them} how wet you already are.",
      "You pour two cups of wine and let {client} watch you drink slowly, tongue tracing the rim, while {they} palms {their} {cock} through {their} clothing.",
      "The parlor's music drifts up through the floorboards as you close the door, turn to face {client}, and let your robe fall open."
    ],
    manager: [
      "The finest room in the house: silk hangings, a fire laid, a bed wide enough to spread out on. {Client} looks at you like {they} can't decide where to start eating.",
      "You receive {client} yourself, and the moment the door locks you press {them} against it and reach down to feel how badly {they} want{s} this.",
      "Candles, scented oil, a door that locks. {Client} has paid handsomely, and you intend to drain every coin's worth out of {them}."
    ]
  },

  /* Added to the opening if you sized the client up. */
  temperament: {
    nervous: ["{They} {are} trembling, {cock} half-hard and cheeks flushed. You'll need to ease {them} into it.", "{They} can't meet your eyes even as {they} stare{s} at your chest. Nervous ones are easy once you get {them} out of {their} own head."],
    demanding: ["{They} tell{s} you exactly what {they} want{s} done to {them}, and how, and for how long. Fine — you can deliver.", "{They} watch{es} you like a merchant inspecting goods, waiting to see if you're worth the price."],
    generous: ["{They} {are} warm, easy, already half in love. A generous purse and gentle hands — the best kind of client.", "{They} kiss{es} your knuckles and cup{s} your face as though you were something precious. Play along and {they}'ll tip well."],
    dangerous: ["There's something feral and unstable in how {they} look{s} at you. Keep your wits and one hand near the door.", "{Their} smile doesn't reach {their} eyes. You've seen that look before — pleasure and cruelty sitting too close together."],
    ordinary: []
  },

  /* One entry per technique id in INDEX. Lists: start, success, fail, repeat, focus. */
  techniques: {
    /* ---------- Positions ---------- */
    missionary: {
      start: [
        "You pull {client} down onto you, {cock} pressing at your entrance, face to face close enough that every breath {they} let{s} out warms your lips.",
        "You pull {client} between your thighs and reach down to guide {their} {cock} into you — {they} let{s} out a long exhale the moment {they} feel how wet you are.",
        "You spread your thighs and pull {client} down, {cock} pressing at your slick entrance, and {they} groan{s} as {they} slide{s} in."
      ],
      success: [
        "You wrap your legs around {client} and pull {them} deeper, and {they} groan{s} into your neck as {their} {cock} fills you.",
        "Face to face, you hold {client}'s gaze as {they} fuck{es} you slow and deep, too breathless to look anywhere else.",
        "You roll your hips up to meet every thrust, fingers raking down {client}'s back, and {they} curse{s} softly into your shoulder.",
        "You arch up hard against {client} and the two of you find a grinding, urgent rhythm that slams the old bed frame into the wall.",
        "{Client} buries {their} face in your neck, fucking you deep and slow, lips moving against your pulse.",
        "{Client} braces on both forearms over you and drives in with short, steady thrusts, jaw clenched, watching your face crack open with each one.",
        "You grip {client}'s ass and pull {them} in harder — {they} curse{s} quietly and lose{s} {their} careful rhythm.",
        "{Client}'s hips stutter and deepen and {they} curse{s} your name into your hair, {cock} pulsing inside you."
      ],
      high: [
        "You clench tight around {client} as {they} tremble{s} over you, {cock} buried to the hilt, every slow grind pulling {them} closer to spilling inside you.",
        "Skin slick with sweat, breath ragged, {client} fucks you harder as {their} whole body shakes with the effort of holding back."
      ],
      fail: [
        "You knock foreheads, then elbows, and {client}'s {cock} slips out at the worst moment. The spell breaks.",
        "{Client} keeps glancing toward the door, and the {cock} that was so hard a moment ago begins to soften."
      ],
      repeat: ["The same slow missionary again. You're wet and {client} is hard but {they} {are} drifting."],
      focus: ["You lock your ankles behind {client} and pull {them} all the way in, and {they} gasp{s} against your mouth as you squeeze tight around {their} {cock}."],
      finish: {
        success: [
          "You arch hard into {client}'s {cock} as it throbs inside you, clenching around every pulse — {they} bury{es} deep and shake apart against your throat.",
          "You lock your legs around {client}'s hips and squeeze tight, grinding through {their} orgasm as {their} {cock} floods you — {their} voice breaks on the exhale.",
          "{Client}'s {cock} swells and jerks inside you and you bear down on it, drawing out every throb while {they} shudder{s} and grip{s} the sheets beside your head.",
          "You claw at {client}'s back and clench your cunt around {their} pulsing {cock}, pulling {them} through the finish — {they} cry{es} out, forehead to yours, completely undone."
        ],
        expert_success: [
          "You felt it building — the hitch in {their} breath, the {cock} swelling — so you clenched hard and bore up into {them}, and {client} cum{s} with a stunned, helpless sound, like {they} didn't see it coming even as you brought {them} there.",
          "You've learned the exact angle that sends {client} over — you grind into it and hold it and feel {their} {cock} throb its warning before {they} spill{s} inside you, deep and shaking, already ruined before the first pulse."
        ],
        bare_success: [
          "Chest to chest and skin slick with sweat, {they} cum{s} hard inside you — you feel every pulse of it where your bodies are joined.",
          "Nothing between you when {they} break{s} — {their} {cock} jerking inside you, sweat on your ribs, {their} breath coming apart against your mouth."
        ],
        dressed_success: [
          "{Their} clothes are still half-on when {they} lose it — {cock} buried inside you, fabric bunched at {their} hips, everything else forgotten.",
          "{They} cum{s} still half-dressed, like {they} couldn't wait — and by the sounds {they} make, {they} couldn't."
        ],
        fail: [
          "{Client} pull{s} back, {cock} still hard and slick, frustration in the set of {their} jaw — the angle never got there.",
          "You can see the moment {they} lose{s} it — not an orgasm, just the slow leak of momentum — and {they} roll{s} aside with a quiet, defeated exhale."
        ]
      }
    },
    cowgirl: {
      start: [
        "You shove {client} back onto the pillows, straddle {their} hips, and sink down slowly onto {their} {cock} until {they} gasp{s}.",
        "You climb on top and line {client}'s {cock} up with your entrance — {they} watch{es} with open, undone eyes as you lower yourself onto every inch.",
        "You push {client} flat on {their} back and straddle {them}, reaching down to grip {their} {cock} and press the head in — {their} breath hiss{es} out between clenched teeth."
      ],
      success: [
        "You ride {client} in slow, rolling circles, watching every flicker of pleasure cross {their} face as your cunt grips {them}.",
        "Palms flat on {client}'s chest, you set the pace — deep and unhurried — and {they} {are} too busy moaning to do anything but lie there and take it.",
        "You lean down and kiss {client} without losing the rhythm, cunt clenching around {their} {cock}, and {they} moan{s} into your mouth.",
        "You grind your hips in a slow figure of eight until {client}'s hands clench on your thighs hard enough to bruise.",
        "You lean back, braced on {client}'s knees, {cock} buried deep, and let {them} look at where you're joined.",
        "You grind down hard and still, {cock} buried to the base, and watch {client} try to thrust up into you — you don't let {them}.",
        "{Client} grabs your hips and tries to set the pace from below; you pin {their} wrists and keep going exactly as you were, and {they} moan{s}.",
        "You roll your hips slow and deliberate and watch {client}'s mouth fall open and stay there."
      ],
      high: [
        "You ride {client} with long, merciless strokes, milking {their} {cock} until {they} beg{s} you to let {them} cum.",
        "{Client} arches up beneath you, hips stuttering, as you fuck yourself to the finish on {their} {cock}."
      ],
      fail: [
        "You lose your balance and nearly topple sideways. {Client} laughs, {cock} softening, and it isn't the laugh you wanted.",
        "Your thighs burn and your rhythm stumbles. {Client}'s {cock} slips out and {they} wait{s} beneath you, patient, while you recover."
      ],
      repeat: ["The same ride again. {Client} lies there with a hard {cock} and glazed eyes, present in body only."],
      focus: ["You fuck {client} hard and relentless, cunt working {their} {cock} without mercy, and {they} grip{s} your hips to keep from bucking {them}self off the bed."],
      finish: {
        success: [
          "You grind down and clench tight as {client}'s {cock} throbs inside you — {they} grab{s} your hips and slam you onto every pulse, spending hard with a wrecked sound.",
          "You roll your hips slow and deliberate through {client}'s orgasm, milking {their} {cock} as it floods you, watching {their} face fall completely apart beneath you.",
          "You feel the twitch and the swell and you ride it — cunt gripping {their} jerking {cock}, hips rolling, working {client} through every wave until {they} {are} shaking.",
          "{Client}'s {cock} bucks hard inside you and you bear down on it, clenching around every jerk — {they} cry{es} out, hands white-knuckled on your thighs, nowhere to go."
        ],
        expert_success: [
          "You've kept {client} exactly here, on the edge, for long enough — now you drop your hips and grind in tight, deliberate circles and {their} {cock} floods you before {they} can catch a breath.",
          "You know the moment — the deepened flush, the {cock} going rigid beneath you — so you clench and ride it, and {client} spill{s} inside you with a helpless, stricken sound, totally in your hands."
        ],
        bare_success: [
          "You come down hard onto {client}'s {cock} as {they} cum{s}, your bare thighs slapping {their} hips, nothing between you.",
          "Skin on skin from hip to knee and {their} {cock} spilling inside you — you feel all of it from where you're joined up through your chest."
        ],
        dressed_success: [
          "{Their} breeches are shoved to mid-thigh when {they} cum{s}, {cock} buried inside you, clothes a crumpled wreck beneath you both.",
          "Half-undressed and all the way spent: {client} cum{s} hard with {their} clothes still bunched at the waist, you riding down through every last pulse."
        ],
        fail: [
          "You feel {client}'s {cock} go from almost-there to just-hard as {they} lose{s} the thread of it beneath you.",
          "{They} groan{s} and put{s} a hand on your hip to still you — not from pleasure, from the approaching quiet of not-quite-cumming."
        ]
      }
    },
    reverse_cowgirl: {
      tags: ["away"],
      start: [
        "You straddle {client} facing away and sink down onto {their} {cock}, giving {them} the full view of your ass as you take every inch.",
        "You turn away from {client}, straddle {their} hips, and reach back to guide {their} {cock} into you — {they} groan{s} at the view before you've even moved.",
        "You climb on backwards, {cock} in hand, and ease down onto it with your ass toward {client}'s face — {they} inhale{s} sharply and grab{s} your hips."
      ],
      success: [
        "You roll your hips in slow circles with {client}'s {cock} inside you, and {their} hands find your waist to pull you harder onto {them}.",
        "You glance back over your shoulder and catch {client} biting {their} lip, staring at where your ass meets {their} hips.",
        "{Client} traces up your spine as you ride {them}, {cock} buried deep, and {their} breathing turns into panting.",
        "You sway forward and rock back, fucking yourself slowly on {client}'s {cock}, and hear {them} groan behind you.",
        "{Client}'s fingers dig into the meat of your ass as you set a slow, grinding pace on {their} {cock}.",
        "You lean forward, braced on {client}'s knees, and fuck {them} at a new angle — the wet sounds change and {they} moan{s} louder.",
        "{Client} reaches forward to grab your hips and slap you down harder onto {their} {cock} — you let {them} for exactly two thrusts, then take control back.",
        "Behind you, {client} is making soft, broken sounds with every roll of your hips, totally at your mercy."
      ],
      high: [
        "You quicken, riding {client}'s {cock} hard, and behind you {they} give{s} up any pretense of keeping quiet.",
        "{Client} grips your hips and thrusts up to meet you, breathless, as you carry {them} toward cumming."
      ],
      fail: [
        "Facing away from {client}, you misread the angle and {their} {cock} slips out. {They} groan{s} in frustration.",
        "An awkward grind, a muttered curse behind you. You both stop to adjust."
      ],
      repeat: ["The view of your ass is lovely but {client}'s seen enough of it now."],
      focus: ["You lean forward and ride {client}'s {cock} harder and faster, and behind you {they} lose{s} any composure {they} had left."],
      finish: {
        success: [
          "You press your ass down hard and grind back as {client}'s {cock} throbs inside you — {they} grip{s} your hips and surge up, spending deep with a raw, gutted sound.",
          "You feel {them} stiffen beneath you and squeeze your cunt tight around {their} pulsing {cock}, riding every jerk — {they} shudder{s} apart, hands bruising your hips.",
          "{Client}'s {cock} floods you and you rock back into it, clenching through every pulse — {they} let{s} out a low, broken sound that doesn't stop until {their} hips still.",
          "You grind your ass flush to {client}'s hips as {they} spill{s} inside you, working {their} {cock} through the whole orgasm, and {they} can do nothing but hold on."
        ],
        expert_success: [
          "You've been reading {client}'s body all session — so when {their} {cock} swells beneath you, you press back hard and clench tight, and {they} cum{s} with a startled, stricken cry, hands locked on your ass.",
          "You roll your hips in the angle you know breaks {them} and hold it — {client}'s {cock} bucks and floods inside you, and you don't stop grinding until {they} {are} limp and breathless beneath you."
        ],
        bare_success: [
          "Nothing covering either of you when {they} cum{s} — just {their} bare hands on your bare ass and {their} {cock} spending inside you.",
          "Skin against skin all the way down, you feel the shudder move through {client}'s whole body into yours as {they} spill{s}."
        ],
        fail: [
          "Behind you, {client} exhale{s} — long, quiet, and resigned. The orgasm never came.",
          "The angle was almost right and then wasn't. You feel {their} {cock} soften inside you without fanfare."
        ]
      }
    },
    doggy_style: {
      tags: ["away"],
      start: [
        "You get on your hands and knees on the mattress and look back over your shoulder at {client}, cunt wet and waiting.",
        "You turn over onto your stomach and push your ass up — {client} grips your hips and lines {their} {cock} up with a sharp exhale.",
        "You drop to your hands and knees and reach back to spread yourself open, and {client} press{es} in with a low, rough sound."
      ],
      success: [
        "{Client} grips your hips and fucks you from behind in a deep, steady rhythm, and you push back to take every thrust.",
        "You arch your back and present yourself, and {client} let{s} out a low, raw sound before {their} {cock} fills you again.",
        "The headboard knocks against the wall in time with {client}'s thrusts, a steady knock-knock that the whole hall can hear.",
        "{Client}'s hands slide up your spine as {they} fuck{es} you slow and deep from behind, {cock} rubbing just right.",
        "You glance back and catch {client} staring at where {their} {cock} disappears into you, face slack with pleasure.",
        "{Client} grabs a fist in your hair and yanks back while {their} {cock} drives in — you let out a sound that's not entirely protest.",
        "You can hear {client} panting behind you, hips snapping against your ass with each thrust, voice fraying with the effort of holding back.",
        "{Client} leans over your back and reaches a hand around to your cunt, and you both find a rhythm that makes the headboard crack against the wall."
      ],
      high: [
        "The fucking turns urgent, the bed screaming under you both, and {client} groans your name as {their} hips slam your ass.",
        "{Client} holds your hips pinned as {they} chase{s} the finish, {cock} driving deep with every stroke."
      ],
      fail: [
        "The angle's wrong and {their} {cock} keeps slipping out. You both shuffle on the mattress, irritated.",
        "{Client} loses the rhythm behind you and the steady fucking turns into an awkward, stuttering mess."
      ],
      repeat: ["The same again from behind. {Client}'s grip has gone lazy and so has the fucking."],
      focus: ["You brace against the headboard and shove back hard onto {client}'s {cock}, and {they} can only hold on and let you use {them}."],
      finish: {
        success: [
          "You shove back hard and clench tight as {client}'s {cock} throbs inside you — {they} slam{s} forward and cum{s} with both hands locked on your hips, the whole bed jolting.",
          "You hear the hitch and feel the {cock} swell and you push back onto it, squeezing through every pulse — {client}'s broken groan spills into the room as {they} spend.",
          "{Client} buries {their} {cock} deep and you bear down around it, grinding back through the orgasm — {they} shudder{s}, forehead dropping to your spine, shaking all the way through.",
          "You shove your ass hard onto {client}'s {cock} as {they} cum{s}, clenching around every jerk — {they} cry{es} out helplessly and {their} hips snap forward through the whole finish."
        ],
        expert_success: [
          "You felt the rhythm break behind you — that specific catch in the breath, the {cock} swelling — so you clenched hard and drove back, and {client} cum{s} with a strangled cry, spending deep inside you before {they} even knew it was happening.",
          "From this angle you know exactly how to finish {client}: press back, tighten, and hold the angle. {Their} {cock} floods you in three hard pulses and {they} collapse{s} against your back, completely wrecked."
        ],
        bare_success: [
          "Bare skin slapping against bare skin as {client} cum{s} — the wet sound of it and {their} broken groan and {their} {cock} pulsing inside you all at once.",
          "Nothing between you but sweat when {they} spill{s} — {their} chest against your back, {cock} buried in you, shaking."
        ],
        fail: [
          "{Client} pull{s} out and roll{s} aside, {cock} still hard and flushed, the orgasm that was building just — gone.",
          "The rhythm breaks at the worst moment and {they} exhale{s} through clenched teeth, {cock} soft and the moment done."
        ]
      }
    },
    spooning: {
      tags: ["away"],
      start: [
        "You curl together on your sides, {client}'s {cock} pressing against your ass from behind, {their} arm pulling you close.",
        "You turn onto your side and press your back to {client}'s chest — {they} guide{s} {their} {cock} into you from behind, arm pulling you tight, mouth at your ear.",
        "You lie together on your sides and reach back to guide {client}'s {cock} between your thighs — {they} hiss{es} as {they} slide{s} in and pull{s} you hard against {their} hips."
      ],
      success: [
        "You rock back against {client}, {cock} sliding in deep from behind, {their} breath hot and wet against your neck.",
        "{Client} presses open-mouthed kisses along your shoulder while {their} hips roll into yours, {cock} buried and slow.",
        "Unhurried and slick together, you lace your fingers with {client}'s and squeeze as {their} {cock} fills you again.",
        "{Client} murmurs filth into your hair as you grind back onto {their} {cock}, lazy and close.",
        "You reach back to pull {client}'s hand to your cunt, and {they} groan{s} at how wet you've gotten for {them}.",
        "{Client}'s hand slides down your stomach and between your thighs, {cock} still buried inside you, and {they} work{s} you while {they} fuck{es} you slow from behind.",
        "You press your ass back in a slow roll and feel {client}'s {cock} twitch deep inside you — {they} curse{s} quietly into your hair.",
        "Tangled and warm and close, {client}'s {cock} filling you from behind — {they} tighten{s} {their} arm around your waist and thrust{s} deeper."
      ],
      high: [
        "Tangled together, you rock faster, and {client}'s arm tightens around your waist as {their} {cock} drives deep.",
        "{Client} buries {their} {cock} to the hilt and muffles a broken cry against your shoulder."
      ],
      fail: [
        "It's so lazy and warm that {client}'s {cock} begins to soften inside you.",
        "An arm goes numb beneath you and you both have to stop and untangle, {cock} slipping out in the process."
      ],
      repeat: ["Comfortable and wet but the slow spooning isn't building toward anything — {client} is just lying there."],
      focus: ["You press back hard onto {client}'s {cock} and quicken the grind, and {their} arm locks around your waist."],
      finish: {
        success: [
          "You press back into {client}'s {cock} as it throbs inside you, clenching tight and rolling your hips through the orgasm — {their} arm crushes you close and {they} moan{s} into the back of your neck.",
          "You feel the pulse build and you push back onto it, squeezing around every throb — {client} spill{s} with a muffled, wrecked sound into your hair, hips grinding slow and deep.",
          "{Client} whispers your name and you clench hard around {their} pulsing {cock} and grind back until {they} come apart completely, shaking against you.",
          "Tangled together, you rock back into {client}'s {cock} as it floods you — {they} cum{s} with {their} arm locked around your waist, shuddering quietly from the inside out."
        ],
        expert_success: [
          "You felt {client}'s {cock} swell before {their} breathing changed — so you pressed back and clenched and held it there, and {they} spill{s} inside you with a stunned, helpless sound, {their} whole body one long shiver against your back.",
          "You know {client}'s patterns well enough to feel the finish coming from a mile off. You tighten and grind back in the exact way you've learned breaks {them}, and {they} cum{s} with a broken exhale, arms pulling you hard into {their} body."
        ],
        bare_success: [
          "Back flush to {client}'s bare chest when {they} cum{s}, {their} {cock} spending inside you and {their} skin damp against yours.",
          "Nothing between you when {they} break{s} — every shiver passes from {their} body through yours."
        ],
        fail: [
          "{Client}'s {cock} softens inside you without ceremony. {They} stay{s} still a moment, then quietly untangle{s}.",
          "Too slow, too gentle — the warmth built into nothing and {they} drift{s} away from the edge without crossing it."
        ]
      }
    },
    standing: {
      start: [
        "{Client} presses you back against the wall, lifts your thigh, and shoves {their} {cock} into you before you've caught your breath.",
        "You press {client} against the wall for a moment, then spin — your back meets the plaster and {their} {cock} finds you in one sharp thrust.",
        "You hook your knee over {client}'s hip and reach down to guide {their} {cock} into you, and {they} gasp{s} and pin{s} you harder to the wall."
      ],
      success: [
        "You hook a leg around {client}'s hip and grind yourself onto {their} {cock}, the wall cold at your back.",
        "{Client} braces one hand on the wall beside your head, fucking you standing up, trembling with the effort.",
        "Plaster at your back and {client}'s {cock} inside you — the urgency of it has you both panting and cursing.",
        "You lock your arms around {client}'s neck and let {them} lift you up the wall, {cock} driving deeper at the new angle.",
        "The wall at your back and {client} pounding into you — each thrust pinning you harder against the stone.",
        "{Client} lift{s} your other thigh and pin{s} you fully against the wall, {cock} buried, grunting with the effort of holding you there.",
        "Every thrust grinds you up the wall and {client} pulls you back down onto {their} {cock}, the two of you making a filthy wet sound with every impact.",
        "You bite {client}'s shoulder to muffle yourself and feel {them} shudder and drive in harder."
      ],
      high: [
        "{Client} braces against the wall and fucks you harder, legs trembling, both of you teetering on the edge.",
        "You cling to {client}, legs locked around {their} waist, as the fucking turns desperate and sloppy."
      ],
      fail: [
        "Your foot slips on the floorboards and {client}'s {cock} pulls out hard. You both stagger.",
        "{Client}'s arms tire and the whole thing slumps. {They} can't hold the angle."
      ],
      repeat: ["Against the wall again. {Client}'s thighs are burning and the novelty of fucking you standing has worn off."],
      focus: ["You wrap both legs around {client} and grind yourself onto {their} {cock}, and the wall takes everything else."],
      finish: {
        success: [
          "You lock your legs tighter around {client} and clench as {their} {cock} throbs inside you — {they} slam{s} in one last time and cum{s} with a sharp, wrecked sound against your ear.",
          "You grip {client}'s shoulders and grind your hips down onto {their} {cock} through the whole orgasm, both of you barely upright, the wall the only thing keeping you there.",
          "{They} bury{es} {their} {cock} and you squeeze hard around it, feeling every pulse — {client} shudder{s} against you, forehead to the stone, {cock} flooding you.",
          "You press your cunt harder onto {client}'s {cock} as {they} cum{s}, grinding the last of it out of {them} while {their} hips shudder into you and the plaster."
        ],
        expert_success: [
          "You've had your legs locked around {client} this whole time — so when {their} {cock} swells, you clench tight and roll your hips onto it, and {they} cum{s} in a crashing wave, voice breaking against your ear.",
          "You felt {client} getting there and hooked your leg tighter, pulled {them} in deeper, and bore down on {their} {cock} — {they} spill{s} inside you pressed to the wall, shaking, completely at your mercy."
        ],
        bare_success: [
          "Bare against the cold wall, {client} cum{s} inside you and you feel the heat of it from hip to thigh.",
          "Nothing on either of you and {their} {cock} spending inside you pinned to the wall — you feel every pulse."
        ],
        fail: [
          "{Client}'s legs give before {their} {cock} does — you both slide down the wall and the moment's gone.",
          "The orgasm was right there and then {their} {cock} slips out and the whole desperate standing-fuck just ends."
        ]
      }
    },
    "69": {
      start: [
        "You arrange yourselves on the bed so that your cunt is in {client}'s face and {their} {cock} is at your lips — giving and taking all at once.",
        "You swing yourself over {client} so your cunt hovers over {their} mouth and {their} {cock} press{es} against your lips — {they} groan{s} before either of you start{s}.",
        "You climb over {client}, cunt to face, and take {their} {cock} in your mouth at the exact moment {their} tongue finds your clit — you both flinch at the contact."
      ],
      success: [
        "You suck {client}'s {cock} while {their} tongue works your cunt, every moan you make vibrating against {their} shaft.",
        "{Client}'s hands clutch at your thighs as you both eat each other out and lose yourselves in the slickness.",
        "You find a shared rhythm — licking and sucking in time — and {client}'s muffled sounds tell you exactly what {their} tongue is doing right.",
        "You lose track of who is giving and who is receiving, both too wet and too breathless to care.",
        "{Client}'s {cock} pulses against your tongue as {their} muffled moans against your cunt spur you on.",
        "You swallow {client}'s {cock} down and feel {them} groan hard against your cunt — the vibration makes your thighs shake.",
        "{Client} grip{s} your hips and grinds your cunt down against {their} mouth while {their} {cock} throbs against your tongue.",
        "Every time {they} tongue{s} you right you lose your mouth's rhythm on {their} {cock} — {client} notice{s} and does it again."
      ],
      high: [
        "{Client} shudders against your mouth, hips stuttering, tongue losing its rhythm as {they} get{s} too close to think.",
        "You feel {client} tremble against your thighs and redouble your tongue until {they} can't hold still."
      ],
      fail: [
        "It's harder to concentrate on sucking {cock} while being eaten out than it looks, and you both lose the thread.",
        "Someone's knee goes somewhere it shouldn't. You both stop with stifled curses."
      ],
      repeat: ["The novelty of a simultaneous sixty-nine fades and {client} grows distracted."],
      focus: ["You suck {client}'s {cock} like you mean it, throat working, and {they} come{s} apart so hard {they} forget to keep licking."],
      finish: {
        success: [
          "You keep sucking as {client}'s {cock} throbs against your tongue — {they} flood your mouth and moan hard into your cunt, and you swallow without pulling off.",
          "{Client}'s {cock} swells and jerks in your mouth and you seal your lips tighter, throat working through every pulse — {they} moan{s} into your cunt as {they} cum{s}.",
          "You feel {client} losing it and take {them} deeper, tongue pressing as {their} {cock} floods your mouth — {they} cry{es} muffled into your thighs and go limp.",
          "{Their} {cock} pulses three times against the back of your throat and you swallow all of it, still grinding your cunt against {their} face — {client} moan{s} through the whole finish."
        ],
        expert_success: [
          "You felt the {cock} twitch on your tongue and tightened your lips, swallowed against the head — the exact pressure that breaks {client}. {They} flood your mouth with a helpless, muffled cry, and you don't pull off until {they} {are} done.",
          "You knew {client} was close from the way {their} tongue stuttered against you, so you worked your throat down over {their} {cock} and swallowed — {they} cum{s} with a strangled moan into your cunt, twitching through every pulse."
        ],
        fail: [
          "{Client}'s {cock} goes soft against your tongue as {their} focus splits and neither act gets {them} there.",
          "Too much distraction in both directions — {client} exhale{s} and pull{s} away from your cunt, spent but not finished."
        ]
      }
    },
    lotus: {
      start: [
        "You settle into {client}'s lap facing {them}, legs wrapped around {their} waist, {cock} buried deep as you press your foreheads together.",
        "You lower yourself into {client}'s lap, guiding {their} {cock} in as you wrap your legs around {their} waist — {they} go still and breathless as you settle, fully seated.",
        "You climb into {client}'s lap face-to-face, hands on {their} shoulders, and sink down until {their} {cock} is buried and neither of you can tell where the other ends."
      ],
      success: [
        "You rock slowly in {client}'s lap, {cock} buried to the base, breathing in time with every slow grind.",
        "{Client} holds you tight against {their} chest, {cock} pulsing inside you, and you feel {their} heart hammering against yours.",
        "Foreheads touching, you grind together in tiny, aching circles, and {client} whispers your name like a curse.",
        "You wrap yourself around {client} and roll your hips, {cock} held deep, swaying together like you have all night.",
        "Forehead to forehead, {cock} locked inside you, you share one ragged breath between you.",
        "{Client}'s hands slide under your ass and pull you harder onto {their} {cock}, and both of you gasp at the depth.",
        "Wrapped together, barely moving, just breathing and full — {client} lets out a soft, wrecked sound.",
        "You feel {client}'s {cock} pulse inside you and squeeze tight, and {they} inhale{s} sharply and grip{s} you closer."
      ],
      high: [
        "{Client} holds you so tightly crushed against {their} {cock} you can feel every shiver run through {them} into you.",
        "You grind harder in {client}'s lap, riding {their} {cock} in tight circles, and {they} whisper{s} your name like a prayer."
      ],
      fail: [
        "Your legs cramp around {client}'s waist and you have to climb off {their} {cock} with a wince.",
        "It's too slow to build anything and {client} grows restless under you."
      ],
      repeat: ["The same wrapped embrace. Tender, but {client}'s {cock} wants something rougher now."],
      focus: ["You grip {client}'s shoulders and grind harder on {their} {cock}, working {their} lap with real intent, and {they} cling{s} to you."],
      finish: {
        success: [
          "You squeeze your thighs around {client}'s hips and grind in tight as {their} {cock} throbs — {they} cum{s} with {their} arms crushing you close, {cock} pulsing deep inside you.",
          "You press your forehead to {client}'s and clench your cunt around {their} swelling {cock} — {they} shudder{s} through the orgasm, spending inside you with a long, warm exhale.",
          "You bear down on {client}'s {cock} and roll your hips in slow circles as it floods you — {they} press{es} {their} lips to yours and cum{s} quietly, completely, the tremor moving through both of you.",
          "You feel {client} starting to lose it — {cock} throbbing deep — so you lock your legs tighter and grind, and {they} come apart all at once, arms locked around your back, pouring into you."
        ],
        expert_success: [
          "You've held {client} at this depth, at this pace, until {their} whole body is wound to breaking — and then you clench and roll your hips and let them finish, feeling {their} {cock} throb everything it built into you.",
          "You counted {client}'s breaths getting shallower, felt the {cock} deepen its pulse — so you squeezed and rocked and whispered one word, and {they} cum{s} trembling, completely inside your hands."
        ],
        bare_success: [
          "Every inch of bare skin touching when {they} cum{s} — {their} {cock} inside you and {their} chest against yours and nothing else.",
          "Skin to skin, the orgasm moves through {client}'s whole body into yours, {cock} spending deep."
        ],
        fail: [
          "{Client}'s {cock} softens inside you while you're still wrapped together, the slow grind not enough to carry {them} over.",
          "{They} pull{s} back with a quiet sound, {cock} slipping out. Close, but the stillness wasn't the right kind."
        ]
      }
    },
    pretzel_dip: {
      start: [
        "You tangle your legs with {client}'s at a {cock}-twisting angle that makes {them} grin in startled delight.",
        "You guide {client} down beside you, one leg hitched high over {their} hip, and pull {their} {cock} into you at an angle that makes you both go still.",
        "You contort into the pretzel, {cock} sliding in from an angle neither of you expected, and {client} bites {their} lip hard the moment {they} feel where it lands."
      ],
      success: [
        "The angle drives {client}'s {cock} somewhere new and {they} groan{s} in surprised, helpless pleasure.",
        "Limbs tangled, you find a slow rhythm, and {client} grips the sheets as {their} {cock} hits deep.",
        "{Client} laughs breathlessly mid-thrust. {They} never knew it could feel like this from this angle.",
        "The awkward tangle sends {client}'s {cock} rubbing something that makes you gasp, and {they} feel{s} it.",
        "You shift your hips a fraction and {client}'s {cock} finds the perfect spot. {They} gasp{s} aloud.",
        "{Client}'s hand finds your hip and holds you in place, determined not to lose the angle.",
        "A shallow thrust at this angle does things a deep one never did — {client} figure{s} this out and slows way down.",
        "{Client} curse{s} quietly and buries {their} {cock} deeper, the twisted angle pulling a sound from both of you."
      ],
      high: [
        "{Client} grips the sheets in both fists, {cock} buried at that impossible angle, lost entirely.",
        "Limbs knotted together, you fuck {client} right to the brink of spilling."
      ],
      fail: [
        "The tangle becomes a knot, cocks and knees everywhere, and you both have to laugh your way out of it.",
        "A cramp seizes your calf mid-thrust at the worst possible moment."
      ],
      repeat: ["The surprise has worn off and now the angle just feels awkward."],
      focus: ["You lean into the angle and quicken, fucking {client}'s {cock} past any gentleness, and {they} have{s} to bite the pillow."],
      finish: {
        success: [
          "You shift your hips to keep {client}'s {cock} at that exact angle and bear down on it as it throbs — {they} lock up in surprise and cum{s} hard, like {they} didn't think it was going to hit like that.",
          "You clench your cunt around {client}'s {cock} mid-jerk and milk every pulse — {they} lose{s} all composure, legs tangled with yours, voice breaking as {they} spill{s}.",
          "{Client} cries out sharply and you squeeze tight around {their} jerking {cock}, grinding to hold the angle — {they} shudder{s} through the whole thing, deep and helpless.",
          "Limbs knotted together, you bear down on {client}'s {cock} as it floods you — {they} moan{s} in that helpless, undone way and twitches through every pulse."
        ],
        expert_success: [
          "You found the exact spot that ruins {client} three turns ago — so when {their} {cock} swells now, you hold that angle, clench, and let {them} finish into the middle of it. {They} cum{s} with a sharp, fractured cry.",
          "From experience you know {client} needs this angle to break completely — so you twist into it and grip down as {their} {cock} throbs, and {they} spill{s} inside you in one wrenching rush, tangled and wrecked."
        ],
        fail: [
          "The angle was right and then a shift of the hip made it wrong again, and {client}'s {cock} goes soft in the tangle.",
          "{They} exhale{s} and carefully untangle {their} legs from yours, {cock} still hard but the moment lost."
        ]
      }
    },
    coital_alignment_techniq: {
      start: [
        "You shift your hips just so, pressing your clit against {client}'s {cock}, and grind instead of thrust. {Their} eyes go wide.",
        "From missionary you inch your body up until your clit rides the root of {client}'s {cock} — {they} feel{s} the change at once and go very still.",
        "You press your clit hard against {client}'s shaft and roll your hips in a slow circle, and the noise {they} make{s} is immediate and undignified."
      ],
      success: [
        "Slow, grinding, {cock} pressed tight to your clit — you barely move and {client} comes undone anyway.",
        "You press together and rock instead of thrust, and {client} gasps at how the friction of {their} {cock} against you matters more than depth.",
        "The tiny, deliberate grinding movements build and build until {client}'s breathing turns ragged and shallow.",
        "You keep the {cock}-to-clit pressure steady and the pace glacial, and {client} is shaking within minutes.",
        "Every small, grinding circle draws another bitten-off moan from {client}.",
        "{Client} tries to thrust and you press down, refusing the movement, grinding instead — {they} make{s} a broken sound and lets you lead.",
        "Skin dragging on skin, clit to {cock}, nowhere to go but tighter — {client}'s jaw goes slack.",
        "{Client}'s hands clamp your hips and hold the grinding pressure in place, eyes shut, whispering something you can't catch."
      ],
      high: [
        "{Client} clutches at your back, trembling, as the slow {cock}-grinding builds to something {they} can't survive much longer.",
        "You barely move at all — just tight, grinding circles — and still {client} is coming undone."
      ],
      fail: [
        "The movements are too subtle and {client} genuinely can't tell if anything is happening.",
        "You lose the pressure angle and it all goes limp and slack."
      ],
      repeat: ["{Client}'s {cock} wants something harder than the same grinding circle."],
      focus: ["You press your clit harder against {client}'s {cock} and grind with real intent, and {they} clutch{es} your ass to hold the angle."],
      finish: {
        success: [
          "You press your clit harder into the root of {client}'s {cock} as it throbs — {they} shudder{s} apart, cumming from the grinding, {cock} pulsing where it's pressed flush to you.",
          "You keep grinding in those small tight circles as {client}'s {cock} floods — {they} clutch{es} your ass and moan{s} low, utterly wrecked by something that barely looked like fucking.",
          "{Client}'s {cock} swells and twitches and you clench down on it with your whole cunt, still grinding — {they} cum{s} with a long, broken sound, pulling you onto {their} body.",
          "You feel the {cock} pulse against your clit and push into it, rolling your hips through every throb — {client} cum{s} with a stunned exhale, like {they} didn't know this could do that."
        ],
        expert_success: [
          "You've had {client}'s {cock} pressed to your clit for long enough to know exactly how much pressure tips {them} — so you increase it by a fraction, hold the circle, and feel {their} {cock} throb against you as {they} cum{s} with a helpless, fractured cry.",
          "You knew {client} was right there — the {cock} was pulsing, the hips were stuttering — so you ground harder and let {their} {cock} finish pressed tight to your clit, milking {them} through every wave."
        ],
        fail: [
          "The pressure was almost enough, the circles almost right, and then {client}'s {cock} deflates into the quiet admission that it didn't land.",
          "{They} pull{s} back from the grind with clenched teeth and a resigned exhale. Close. Not close enough."
        ]
      }
    },
    leapfrog: {
      tags: ["away"],
      start: [
        "You drop to your elbows on the mattress, hips raised and ass presented, and wait for {client} to come to you from behind.",
        "You drop your chest to the mattress, hips high, and reach back to spread yourself open — {client}'s breath catches audibly.",
        "Elbows down, face in the pillow, ass offered up — you hear {client} move behind you and feel {their} {cock} press at your entrance before {they} push{es} in with a slow, sure stroke."
      ],
      success: [
        "Cheek pressed to the sheets, you arch and push back hard, and {client} lets out a low groan as {their} {cock} fills you from behind.",
        "{Client} finds the angle at once, {cock} sliding deep, and the sounds {they} make{s} while fucking you are worth the price of the room.",
        "You grip the pillow as {client} fucks you from behind, each thrust rocking you forward into the mattress.",
        "You shove back onto {client}'s {cock} with every thrust, and {they} moan{s} low in {their} throat at the wet slap of it.",
        "Cheek on the pillow, you smile to yourself at the filthy, helpless sounds {client} is making behind you.",
        "{Client}'s hands grip your hips hard and pull you back onto {their} {cock}, the wet slap of it filling the room.",
        "You reach between your thighs and feel {client}'s {cock} sliding in and out of you — the contact makes {them} groan{s} and thrust harder.",
        "{Client} lean{s} over you, chest against your back, {cock} still driving, and breathes your name into your hair."
      ],
      high: [
        "{Client} loses the rhythm, {cock} driving deep and ragged as {they} gasp{s} and hold{s} on.",
        "You grip the pillow as {client}'s {cock} surges toward cumming inside you."
      ],
      fail: [
        "Your elbows ache and the pillow keeps sliding toward the edge.",
        "{Client} can't find the right angle from behind and {their} {cock} keeps slipping out."
      ],
      repeat: ["The same position again from behind, and {client}'s focus and {cock}-angle have both drifted."],
      focus: ["You bury your face in the pillow and shove back hard onto {client}'s {cock}, and {they} groan{s} aloud as you take all of {them}."],
      finish: {
        success: [
          "You grip the sheets and shove your hips back as {client}'s {cock} throbs inside you — {they} slam{s} forward and cum{s} with both hands locked on your raised hips, a raw, guttural sound filling the room.",
          "You push hard onto {client}'s {cock} as it floods you, clenching through every jerk — {their} hips grind into your ass and {they} spill{s} with a helpless, wrecked moan.",
          "{They} bury{es} {their} {cock} all the way and you squeeze around it — {client} shakes apart, spending inside you, forehead dropped to your back, entirely broken.",
          "You bury your face in the pillow and bear down onto {client}'s {cock} as {they} cum{s}, clenching around every pulse — {they} drive{s} hard through the finish, {cock} throbbing deep."
        ],
        expert_success: [
          "You felt the {cock} swell and the grip tighten on your hips — so you pressed back hard and squeezed, and {client} cum{s} with a startled cry, spending deep inside you before {they} could even brace.",
          "From this angle, you know how to milk {client} dry: press back, clench, hold still and let the {cock} do the work. {They} shudder{s} through the orgasm, hands locked on your ass, completely lost."
        ],
        fail: [
          "Behind you, {client} slow{s} and stop{s}, {cock} still hard — the finish just didn't come from this angle.",
          "{They} pull{s} out carefully, {cock} flushed and unsatisfied, and there is nothing either of you can do about it."
        ]
      }
    },
    scissoring: {
      start: [
        "You press your cunt against {client}'s, legs twined and hips rocking together, slick and already warm.",
        "You hook one leg over {client}'s hip and pull {their} cunt against yours, and the first wet contact makes you both hiss.",
        "Legs intertwined and cunts aligned, you roll your hips and press — {client}'s mouth falls open at the slick pressure of you."
      ],
      success: [
        "You grind your cunts together, hips rolling, and {client} lets out a long, shaky breath at the wet friction.",
        "Legs entwined, you find a grinding rhythm that has {client} clutching the sheets and biting {their} lip.",
        "Slick folds pressed together, {client}'s head tips back as you grind into {them} harder.",
        "You rock together in a steady, wet grind, breathing in time, each roll of the hips pulling a sound from {client}.",
        "{Client} hooks a leg tighter around yours and pulls you harder against {their} cunt.",
        "The slick noise of your cunts grinding together fills the silence and {client}'s cheeks flush at the sound.",
        "You reach forward and press your palm flat on {client}'s stomach to feel the tremors building there.",
        "{Client} grab{s} your thigh and drives {their} cunt against you with real intent — you meet {them} thrust for thrust."
      ],
      high: [
        "You grind cunts together harder, and {client} shudders and cries out into the room.",
        "{Client} clutches your thigh, trembling on the edge of cumming all over you."
      ],
      fail: [
        "The angle won't hold and you keep slipping apart with a wet, defeated sound.",
        "It's more raw effort than pleasure and you're both breathing hard for the wrong reasons."
      ],
      repeat: ["Pleasant grinding but repetitive. {Client} wants something different."],
      focus: ["You press your cunt harder against {client}'s and grind faster, and {they} cry{es} out."],
      finish: {
        success: [
          "You grind harder into {client}'s cunt as {they} cry{es} out — you feel {their} cunt pulsing against yours and push back into it, working {them} through the whole orgasm.",
          "{Client} pulls you flush against {them} as {they} cum{s} and you don't let up — cunt pressing into {their} cunt, both of you grinding slick and loud through every throb.",
          "You feel {client}'s cunt spasm against yours and bear down on it, rolling your hips through the waves — {they} shudder{s} and cries out, thighs clenching around you.",
          "You lock your thigh tighter and grind your cunt into {client}'s through {their} orgasm, feeling it pulse under you — {they} throw{s} {their} head back and comes apart completely."
        ],
        expert_success: [
          "You've been reading {client}'s cunt this whole time — when you feel it start to flutter against yours, you press harder, roll faster, and let {them} finish into you. {They} cry{es} out sharp and helpless.",
          "You held {client} right on the edge by easing off the grinding when {they} got too close — and now you press your cunt hard against {theirs} and finish it, and {they} cum{s} with a full-body shudder."
        ],
        fail: [
          "The grind builds and fades and {client} exhale{s} flat on {their} back, unable to reach the finish from this angle.",
          "Slipping apart for the last time, {client} look{s} up at you with a rueful, unsatisfied expression."
        ]
      }
    },
    tabletop: {
      start: [
        "You perch on the edge of the table, pull {client} between your spread knees, and send the cups scattering.",
        "You clear the table edge with one sweep and sit — {client} doesn't need the invitation twice, stepping between your thighs and pulling your hips to {their} {cock}.",
        "You hop onto the table and spread your knees. {Client} steps between them and guides {their} {cock} into you, both of you watching it happen."
      ],
      success: [
        "The table creaks and bows under you as {client} fucks you on it, a cup rolling off onto the floor.",
        "You lock your ankles behind {client} and pull {them} deeper, and {they} moan{s} into your hair as {their} {cock} fills you.",
        "Leaning back on your hands on the table, you watch {client} lose {themself} fucking you.",
        "{Client} kisses you hard enough to split a lip while the table rocks and judders beneath you both.",
        "You pull {client} in by the collar, and {they} laugh{s} breathlessly against your mouth before {their} {cock} finds you again.",
        "You grip the table edge and push back against every thrust, and {client} braces and drives harder.",
        "Eye-to-eye at this height, you watch each other's expression — {client}'s face goes slack and open the harder {they} fuck{es} you.",
        "{Client} pull{s} you to the very edge of the table and fuck{es} you from a standing angle that goes impossibly deep — you both gasp."
      ],
      high: [
        "The table thumps against the wall in time with the fucking and {client} doesn't care who hears.",
        "{Client} braces on the table's edge, {cock} driving deep, shaking, almost there."
      ],
      fail: [
        "The table wobbles and you both freeze, waiting for it to give way.",
        "A splinter, a spilled cup, and {client}'s {cock} goes soft with the interruption."
      ],
      repeat: ["The table again. {Client} glances longingly at the bed."],
      focus: ["You grip the table's edge and pull {client}'s {cock} in as deep as it'll go, and the whole table rattles."],
      finish: {
        success: [
          "You brace your hands on the table and clench as {client}'s {cock} throbs inside you — {they} slam{s} the table into the wall and cum{s} with a breaking cry, flooding you.",
          "You wrap your legs around {client} and grip tight as {their} {cock} bucks inside you — {they} grab{s} the table edge and spill{s} with a sharp, wrecked sound, legs going rigid.",
          "You pull {client} in hard with your heels and clench through every throb — {their} {cock} floods you and {their} forehead drops to your shoulder, shaking.",
          "You lean back on the table, squeeze your cunt hard around {client}'s {cock}, and feel {them} cum{s} — {their} hips snap forward and {they} moan{s} low while it pulses inside you."
        ],
        expert_success: [
          "You've had {client}'s {cock} at exactly the right angle this whole time — so when it swells you clench and lock your legs, and {they} cum{s} into you against the wall with a sound that rattles the cups still standing.",
          "You felt the grip tighten on the table edge and knew — so you tightened your cunt and rolled your hips in that particular way, and {client} spill{s} inside you with a helpless, surprised cry."
        ],
        bare_success: [
          "Ass bare on the table, {client}'s {cock} spending inside you — the hard wood beneath you and the warm wet inside you all at once.",
          "Nothing between you when {they} cum{s}, just skin on table edge and {their} {cock} buried deep."
        ],
        fail: [
          "The table's edge is pressing wrong and {client}'s {cock} goes soft mid-fuck with a muttered apology.",
          "{Client} pull{s} back, {cock} flushed and frustrated, and the table has nothing to do with why it didn't finish."
        ]
      }
    },
    "side_by_side_face-to-fac": {
      start: [
        "You lie face to face, hook a leg over {client}'s hip, and guide {their} {cock} into you before pulling {them} flush against you.",
        "You roll to face {client} on the pillow, hitch your top leg over {their} hip, and reach between you to guide {their} {cock} home — {they} slide{s} in slow and you both exhale.",
        "Face to face on your sides, you pull {client} in by the hip and feel {their} {cock} press into you — {they} stop{s} halfway to savor it and you squeeze to pull {them} the rest of the way."
      ],
      success: [
        "Side by side and nose to nose, you fuck slowly and close, cocks and cunts pressed together.",
        "You trade lazy, wet kisses while {client}'s {cock} rocks in and out of you, and {they} sigh{s} against your lips.",
        "{Client}'s hand slides down your ass and pulls you harder onto {their} {cock} with every thrust.",
        "Lazy and deep and close, you fuck face to face, trading slow kisses between slower thrusts.",
        "{Client} traces the curve of your hip down to where {their} {cock} disappears into you.",
        "{Client}'s forehead drops to yours, {cock} buried, and {they} just breathe{s} for a moment before the next slow thrust.",
        "You feel every small movement — there's nowhere to hide in this position, and {client}'s face shows all of it.",
        "{Client} hook{s} a leg over yours to get deeper and makes a low, unguarded sound into your mouth."
      ],
      high: [
        "{Client} pulls you hard against {their} {cock}, breathing ragged against your lips.",
        "Face to face, you watch {client}'s expression crack apart as {they} get{s} close."
      ],
      fail: [
        "Your hip goes numb from the angle and you have to roll over, {cock} slipping out.",
        "It's too gentle to build anything and {client}'s {cock} starts to soften."
      ],
      repeat: ["Sweet, but {client}'s {cock} wants more than sweet."],
      focus: ["You pull {client} hard against you and quicken the fucking, and {they} gasp{s} against your lips."],
      finish: {
        success: [
          "You press your face close and squeeze your cunt around {client}'s pulsing {cock} — you're close enough to watch every flicker of the orgasm cross {their} face as {they} spill{s} inside you.",
          "You pull {client} in hard with the leg hooked over {their} hip and clench through the flood — {they} grab{s} your ass and hold you locked against {their} {cock}, shaking.",
          "You bear down on {client}'s {cock} as it throbs and feel {their} lips part against yours — {they} cum{s} quietly, completely, the orgasm moving through both of you from an inch away.",
          "You feel {client}'s {cock} swell and you tighten your cunt around it — {they} spill{s} inside you face-to-face, shivering, chest pressed to yours, completely open."
        ],
        expert_success: [
          "You've kept {client} right here, looking at you, for long enough — now you clench and roll your hips and let {their} {cock} finish inside you while you watch {their} face go completely undone.",
          "You know what {client}'s orgasm looks like on this face — so when you see it starting, you lock your leg around {their} hip, tighten your cunt, and let {them} spend into you, watching every second of it."
        ],
        bare_success: [
          "Bare and face to face when {they} cum{s}, you feel {their} {cock} spending inside you and {their} whole chest shuddering against yours.",
          "Skin to skin from lips to hips and {client} cum{s} between them — nothing to muffle the wet sounds of it."
        ],
        fail: [
          "Side by side and face to face, {client}'s {cock} softens quietly and {they} let{s} out a short, tired breath.",
          "The gentleness worked against {them} — {they} needed something harder and this wasn't it."
        ]
      }
    },

    /* ---------- Advanced techniques (unlocked by skill) ---------- */
    butterfly: {
      start: [
        "You lie at the very edge of the bed and lift your hips, and {client} steps in close to hold you up and push {their} {cock} into you.",
        "You scoot to the bed's edge and let your hips fall open — {client} steps between your thighs and slides {their} {cock} in slow, hands gripping your hips to hold the angle.",
        "Hips at the mattress edge and legs in the air, you reach down and guide {client}'s {cock} into you from below — the angle makes {them} curse and freeze for a second before {they} start{s} moving."
      ],
      success: [
        "{Client} holds your hips raised and fucks you with slow, deep strokes that hit perfectly at the angle.",
        "You hook your heels over {client}'s shoulders and {they} groan{s} as {their} {cock} goes deeper than before.",
        "Suspended between the bed and {client}'s grip, you take each thrust with your whole body.",
        "{Client} can't stop staring down at {their} {cock} sliding in and out of you, laid out open below {them}.",
        "{Client}'s grip tightens on your hips and {they} pull{s} you onto {their} {cock} instead of thrusting — slower and more devastating.",
        "You watch {client}'s face while {they} fuck{es} you from standing — {their} brow knits and {their} mouth opens as {they} get{s} close.",
        "Your legs over {client}'s shoulders mean every thrust presses deep and {they} groan{s} with the effort of not going too fast.",
        "{Client} duck{s} forward over you, {cock} still buried, and kiss{es} you hard before {they} resume{s} fucking you."
      ],
      fail: ["Your hips slip from {client}'s grip and {their} {cock} pulls out hard. You both wince.", "The edge of the bed is narrower than you thought and the whole thing nearly tips."],
      repeat: ["The same raised-hip angle again, and {client}'s arms are burning."],
      focus: ["You arch your hips higher and pull {client}'s {cock} in hard, and {they} cry{es} out."],
      high: ["{Client} trembles, holding your hips up, {cock} buried deep as {they} fight{s} not to cum yet.", "You arch against {client}'s grip, cunt clenching around {their} {cock}, and {they} gasp{s}, nearly undone."],
      finish: {
        success: [
          "You arch your hips into {client}'s {cock} and clench as it throbs — {they} cum{s} with both hands locked on your raised hips, driving in hard at that angle while {their} arms shake.",
          "You squeeze your cunt tight around {client}'s {cock} as it floods you at that lifted angle — {they} spill{s} with a stunned, breathless cry, buried deep.",
          "You bear down on {client}'s {cock} as {they} pound{s} through the orgasm — {their} hips drive and the bed rattles and you clench through every pulse.",
          "You grip the sheets and clenching tight as {client}'s {cock} throbs inside you — {they} lock{s} your hips in place and cum{s} deep, unable to do anything but shake and spend."
        ],
        expert_success: [
          "You kept your hips arched at exactly the right angle the whole time — when {client}'s {cock} swells, you clench and push down onto it, and {they} cum{s} with a broken, helpless cry at a depth you put {them} at on purpose.",
          "You knew that angle would break {client}: you held it, squeezed, and let {their} {cock} finish deep inside you. {They} shudder{s}, arms trembling, spending everything they had."
        ],
        bare_success: [
          "Your bare hips in {client}'s bare hands, {their} {cock} spending inside you at that raw, open angle.",
          "Laid out and lifted and naked when {they} cum{s} — nothing between you and every pulse of {their} {cock} inside you."
        ],
        fail: [
          "{Client}'s arms give before {their} {cock} does — your hips slip and {their} {cock} pulls out, the orgasm that was building scattered.",
          "{They} lower{s} you to the bed gently, {cock} still hard and flushed, arms trembling with more effort than they had."
        ]
      }
    },
    the_throne: {
      start: [
        "You settle {client} in the high-backed chair, spread {their} knees, and kneel between {them} to take {their} {cock} in your mouth.",
        "You point at the chair. {Client} sit{s}. You drop to your knees between {their} thighs and take {their} {cock} in your mouth without preamble — {they} grip{s} both armrests immediately.",
        "You seat {client} in the high chair, kneel at {their} feet, and take {their} {cock} into your mouth with a patience that makes {them} whimper before you've even started."
      ],
      success: [
        "Enthroned and helpless, {client} grips the carved chair arms while you suck {their} {cock}.",
        "You take your time working {client}'s {cock} with your tongue, and {their} head drops back against the chair.",
        "{Client} winds trembling fingers into your hair, not guiding, just needing something to hold.",
        "You glance up from between {their} thighs and the look on {client}'s face — desperate, grateful — is worth every coin.",
        "You work the underside of {client}'s {cock} with your tongue and {they} buck{s} in the chair, then catch{es} {themself} and sits very still.",
        "You take {client}'s {cock} deep and hold it there — {their} thighs go rigid on either side of your head.",
        "Mouth full of {client}'s {cock}, you look up and hold {their} gaze, and {they} let{s} out a ragged, wrecked sound.",
        "{Client}'s hand tightens in your hair — not pushing, just holding on — {cock} throbbing against your tongue."
      ],
      fail: ["The chair creaks and wobbles alarmingly and you both stop, certain it's about to give.", "You lose the rhythm on {their} {cock} and {client} shifts restlessly, grip tightening on the chair."],
      repeat: ["The same throne devotion again, and {client}'s {cock} has stopped twitching the way it did the first time."],
      focus: ["You suck {client}'s {cock} like you're trying to pull the soul out of {them}, and {they} clutch{es} the chair arms until the wood creaks."],
      high: ["{Client} grips the chair until {their} knuckles whiten, {cock} throbbing against your tongue, gasping.", "Enthroned and helpless, {client} is seconds from flooding your mouth."],
      finish: {
        success: [
          "You keep your mouth working as {client}'s {cock} throbs against your tongue, shooting hot down your throat — you swallow, and swallow again, and don't pull off until {they} {are} done.",
          "{Client}'s {cock} floods your mouth and you seal your lips and swallow it down, throat working — {they} spill{s} with a helpless cry into the ceiling, hips lifting off the chair.",
          "You feel the {cock} pulse and take it deeper, swallowing around the head — {client} let{s} out a broken, breathless sound and {their} hand fists in your hair as {they} cum{s}.",
          "You press your tongue against {client}'s pulsing {cock} and swallow every throb — {they} jerk{s} in the chair, hand white-knuckled on the arm, completely undone between your lips."
        ],
        expert_success: [
          "You've been reading this {cock} long enough to know the exact tightening that comes before — so you take {client} deeper and swallow hard against the head the moment {their} hips lift, and {they} flood your throat with a stunned, cracked cry.",
          "You kept the suction slow and deliberate until {client}'s thighs were shaking — then you took {their} {cock} all the way down and swallowed, and {they} cum{s} into your throat like {they} had no choice."
        ],
        fail: [
          "{Client}'s {cock} softens against your tongue without finishing — {they} reach{es} down, pulls you up, looks away.",
          "Your mouth wasn't enough tonight. {Client} shift{s} in the chair, {cock} going soft, and says nothing."
        ]
      }
    },
    slow_burn: {
      start: [
        "You warm scented oil between your palms and begin working it into {client}'s skin, starting at the shoulders, heading lower.",
        "You pour a thin line of warm oil down {client}'s spine and start at the shoulders with slow, deliberate palms — {they} exhale every bit of tension into the pillow.",
        "Your oiled hands find {client}'s shoulders and {they} melt{s} before you've done anything at all — by the time you're working down toward {their} hips, {their} {cock} is already half-hard."
      ],
      success: [
        "Your hands work the tension from {client}'s shoulders, sliding lower, oiled fingers trailing toward {their} {cock}.",
        "{Client} melts into the sheets under your hands, half-hard and barely breathing.",
        "Every slow, oiled stroke draws {client} tighter, {cock} filling, though you haven't touched it yet.",
        "You drag lazy patterns across {client}'s stomach and thighs, circling {their} {cock} without touching it, and {they} sigh{s} desperately.",
        "Your oiled thumbs press into {client}'s inner thigh and {they} spread{s} wider with a soft, wanting sound.",
        "You graze the base of {client}'s {cock} with your knuckles — barely contact — and {they} inhale sharply and go very still.",
        "{Client} reach{es} for you and you move {their} hand back down with one quiet word — {they} obey{s}, {cock} twitching.",
        "Long, slow strokes up {client}'s stomach, down again, just shy of {their} {cock} every time — {they} {are} trembling."
      ],
      fail: ["The oil has gone cold and {client} shivers away from your hands.", "You find a knotted muscle and press too hard — {client} winces and the mood sours."],
      repeat: ["The same slow, maddening strokes again, and {client}'s {cock} has been hard long enough to hurt."],
      focus: ["You stop being patient and grab {client}'s {cock}, and {they} gasp{s} like you've saved {their} life."],
      high: ["After all that teasing, {client}'s {cock} is leaking and {they} shiver at the lightest touch.", "{Client} arches into your oiled hands, begging you to finish what you started."],
      finish: {
        success: [
          "You tighten your oiled fist as {client}'s {cock} throbs and stroke through every pulse — {they} spill{s} over your hand with a long, shaking exhale, body finally releasing everything you wound up.",
          "You grip {client}'s {cock} and feel it jerk in your palm, slicking your fingers — {they} cum{s} hard, mouth open on nothing, and you stroke through it until {they} beg you to stop.",
          "After all that teasing, {client}'s {cock} floods your fist in sharp, helpless pulses — you keep your grip tight and slow and milk every last drop out of {them}.",
          "{Client} grab{s} your wrist as {their} {cock} bucks in your hand — not to stop you, just to hold something — and you stroke {them} through every throb until {they} {are} spent and shaking."
        ],
        expert_success: [
          "You've been building {client} for long enough to know exactly when to tighten and quicken — so you do, your oiled hand working steady and deliberate, and {their} {cock} floods your palm as {they} cum{s} with a helpless, wrecked sound.",
          "You held {client} at the edge twice before letting {them} finish — now your fist closes tight around {their} {cock} and you stroke through the orgasm, and {they} spill{s} hard, completely undone by the waiting."
        ],
        fail: [
          "All that slow patience and the tension bleeds out without breaking — {client}'s {cock} softens in your oiled hands without cumming.",
          "{They} lie{s} there flushed and hard and ultimately unsatisfied, the build going nowhere."
        ]
      }
    },
    anal: {
      tags: ["away"],
      start: [
        "You use your fingers and oil to open {client} up slowly from behind, taking your time until {they} {are} loose and wanting.",
        "You work {client} open with oiled fingers, slow and patient, until {they} {are} pushing back against your hand and asking — only then do you press your {mycock} against {their} ass and ease in.",
        "Two fingers deep in {client}'s ass and {they} {are} already moaning into the pillow — you add a third, feel {them} clench and relax, then replace your fingers with your {mycock} in one long, careful push."
      ],
      success: [
        "Slow, careful, {cock} pressing deep into {client}'s ass — you find a rhythm that leaves {them} breathless and gripping the sheets.",
        "{Client} sighs and pushes back onto you, ass relaxing around you, trusting you completely.",
        "You ease into a steady fucking pace and {client} murmurs for more, deeper.",
        "{Client}'s fingers knot in the sheets as your {mycock} works {their} ass in long, slow strokes.",
        "You reach around and wrap a hand around {client}'s {cock} while you fuck {their} ass, and {they} sob{s} softly into the pillow.",
        "{Client} shove{s} back to meet your thrusts, ass gripping you tight, and breathe{s} your name like a question.",
        "Buried in {client}'s ass, you still — just hold — and feel {them} clench around you and beg you to keep going.",
        "You pull out almost all the way, then push back in slow and full, and {client}'s whole body shudder{s}."
      ],
      fail: ["You push too fast and {client} tenses hard around you. You stop and wait, hand stroking {their} back.", "{Client} isn't ready and you ease out at once, reaching for more oil."],
      repeat: ["The same slow fucking from behind, and {client} wants a change."],
      focus: ["You quicken carefully and {client} cries out into the pillow as you fuck {their} ass harder."],
      high: ["{Client} trembles, shoving {their} ass back onto your {mycock}, close to cumming from this alone.", "Slow and deep in {client}'s ass, you carry {them} right to the edge."],
      finish: {
        success: [
          "You press in deep and still as {client}'s ass clenches around your {mycock} — {they} spill{s} untouched, {cock} jerking, ass gripping you through every pulse.",
          "{Client} shoves back onto your {mycock} as {their} orgasm hits — ass going impossibly tight around you — and you drive forward to meet it, feeling every clench and shudder from the inside.",
          "You feel {client}'s ass seize around your {mycock} and bear into it, filling {them} deep through the whole orgasm — {they} spill{s} with a raw, broken sound into the pillow.",
          "{Client} reach{es} back and grip{s} your hip and you hold still and deep as {their} ass works your {mycock} through the finish — {they} cum{s} with a helpless sound, {cock} pulsing against the sheets."
        ],
        expert_success: [
          "You've had {client} exactly where you want {them} for the last several strokes — so when {their} ass tightens, you press in deep and still, and {they} cum{s} with your {mycock} buried in {their} ass, shaking apart from the inside.",
          "You felt the ass start to grip and pulled back deliberately, then pushed in slow and full — and {client} spill{s} untouched with a cry into the pillow, ass clenching tight around you through every pulse."
        ],
        bare_success: [
          "Skin against skin, your {mycock} buried in {client}'s ass when {they} cum{s} — you feel every clench and shudder from the inside.",
          "Nothing between you when {they} break{s} — {their} bare back against your chest, ass tight around your {mycock}, spending onto the sheets."
        ],
        fail: [
          "{Client} exhale{s} quietly and still{s}. {Their} body relaxed but the orgasm never built from the back.",
          "Careful and deep but not enough — {client} eases forward off your {mycock} without cumming, reaching for {their} own {cock} with a rueful look."
        ]
      }
    },
    bridge: {
      start: [
        "You arch your back off the bed into a high bridge, hips raised, and {client} stares before stepping in to fuck you from below.",
        "You plant your feet and hands and arch into a full bridge — {client} looks at you for a long second, then steps between your arched thighs and pushes {their} {cock} up into you.",
        "The bridge position puts your cunt at exactly the right angle — {client} discovers this when {they} slide{s} in and immediately make{s} a strangled sound."
      ],
      success: [
        "Arched and trembling, your whole body taut, {client} is breathless at both the sight and the way your cunt grips {them}.",
        "Arched into the bridge, you take {client}'s {cock} in rolling, deliberate waves.",
        "{Client} holds your waist from below, marveling at what your body can do while it squeezes {their} {cock}.",
        "Every muscle in your body shakes, and {client}'s {cock} inside you shakes too.",
        "{Client} fuck{es} up into you while you hold the arch, and the angle makes you clench around {their} {cock} involuntarily.",
        "You push down onto {client}'s {cock} from the bridge and {they} groan{s} at having you take over the rhythm.",
        "{Client}'s hands press against your arched stomach as {they} fuck{es} you, feeling the tension in every muscle you're holding.",
        "You hear {client} curse under {their} breath and feel {their} {cock} pulse — the view of you arched and taking it is doing as much work as the fucking."
      ],
      fail: ["Your arms give way and you collapse onto {client}, {cock} slipping out in a heap.", "You can't hold the bridge and the whole position tumbles."],
      repeat: ["Impressive the first time. {Client}'s seen it now."],
      focus: ["You hold the bridge and slam your hips down onto {client}'s {cock}, and {they} gasp{s} aloud."],
      high: ["You hold the arched bridge through shaking arms, cunt working {client}'s {cock}, and {they} {are} undone beneath you.", "{Client} clings to your waist, trembling, {cock} throbbing on the edge of cumming."],
      finish: {
        success: [
          "You hold the arch with shaking arms and clench your cunt around {client}'s {cock} as it throbs — {they} grip{s} your waist and cum{s} up into you, spending deep.",
          "Still arched over {client}, you squeeze hard around {their} pulsing {cock} — {they} spill{s} with a stunned, breathless cry, buried at the full depth of the bridge.",
          "You bear down onto {client}'s {cock} as {they} pound{s} up through the orgasm — the bridge finally breaks as you both collapse, {cock} still throbbing inside you.",
          "You lock the bridge angle and clench your cunt tight as {client}'s {cock} floods you — {they} cum{s} deep with a wrecked, helpless sound you'll both remember."
        ],
        expert_success: [
          "You've held this bridge through burning arms because you know what this angle does to {client} — and when {their} {cock} swells, you clench and push down onto it, and {they} cum{s} into you with a cry that cracks right down the middle.",
          "You held the bridge longer than comfortable, kept {client}'s {cock} at that exact depth — then you squeezed and tilted your hips the last inch, and {they} spill{s} inside you with a helpless shout, completely ruined."
        ],
        fail: [
          "Your arms give before {client}'s {cock} gets there — you collapse and the orgasm collapses with you.",
          "{Client} was so close — you felt it — but the position broke and the finish went with it."
        ]
      }
    },
    tantric_union: {
      start: [
        "You sit facing {client}, legs entwined, {cock} buried deep and still, slowing your breathing until it matches {their} own.",
        "You guide {client} to sit cross-legged, climb into {their} lap, and sink onto {their} {cock} — then stop. Still. Both of you breathe. {They} look{s} like {they} might die.",
        "Facing each other, legs interlocked, {cock} buried as deep as it goes — you tell {client} to breathe and be still. {Their} hands shake before they settle."
      ],
      success: [
        "Breath for breath, {cock} buried without moving — the stillness itself becomes a kind of fucking.",
        "You hold {client}'s gaze, {cock} locked inside you, and the world narrows to the two of you and the pressure between you.",
        "Every minute shift of your hips sends a long, rolling shiver through {client}'s {cock} and up into {their} chest.",
        "Time stretches. {Client} has never felt anything like being held inside someone without thrusting.",
        "{Client}'s {cock} pulse{s} inside you and {they} inhale{s} sharply, then force{s} {their} breathing slow again.",
        "You shift one inch and {client}'s eyelids flutter — neither of you speaks, but the contact says everything.",
        "{Client}'s hands on your hips tighten and release like they can't decide whether to move you or just hold you there.",
        "The room goes quieter and {client}'s whole body soften{s} around you, {cock} still buried and steady."
      ],
      fail: ["Your breathing falls out of step, and the meditative stillness turns into awkward sitting.", "{Client} can't hold still, {cock} twitching inside you, and the whole thing scatters."],
      repeat: ["Even stillness with a {cock} inside you can grow routine, and {client}'s mind wanders."],
      focus: ["You deepen every slow breath and tighten around {client}'s {cock}, and {they} shudder{s}."],
      high: ["The stillness breaks like a dam — {client} starts fucking you hard and comes apart trembling.", "Wrapped together, breathing as one, you carry {client} to an orgasm that starts somewhere deep and quiet."],
      finish: {
        success: [
          "You feel {client}'s {cock} begin to throb inside you and clench your cunt tight — {they} cum{s} without a single thrust, the orgasm moving through both of you in long, deep waves.",
          "You squeeze your cunt around {client}'s {cock} in the stillness and feel it start to pulse — {they} shudder{s} into you slowly, spending deep, forehead still pressed to yours.",
          "{Client}'s {cock} fills and throbs inside you and you hold it there, clenching softly — {they} cum{s} completely, quietly, the whole orgasm carried in the stillness.",
          "You feel the pulse start through {client}'s {cock} before you hear it in {their} voice — you tighten your cunt and breathe and let {them} finish inside you, deep and trembling."
        ],
        expert_success: [
          "You've held this stillness through everything — through {client}'s twitching and the urge to move — and now you clench your cunt in one slow, deliberate squeeze, and {their} {cock} floods you as {they} cum{s} with a long, shaking exhale.",
          "You knew the stillness was doing the work — felt {client}'s {cock} getting heavier inside you — so you gave them one small movement, just enough, and {they} spill{s} into you without warning, completely stripped by the quiet."
        ],
        fail: [
          "The stillness held nothing in the end — {client}'s {cock} softens inside you and the meditative mood becomes just two people sitting very close.",
          "{They} exhale{s} and carefully withdraw, {cock} soft, the breathwork not enough to carry {them} through."
        ]
      }
    },

    /* ---------- Kinks ---------- */
    bondage: {
      tags: ["bound"],
      start: [
        "You bind {client}'s wrists with a silk cord behind {their} back, pulling snug, checking the give before you step away.",
        "You wrap silk cord around {client}'s wrists, looping it twice and tying it firm — {they} test the knot immediately, finding it holds, and let out a low breath.",
        "You take {client}'s wrists in both hands, cross them behind {their} back, and bind them with slow, deliberate loops of cord — {they} go very still by the time you cinch the last knot."
      ],
      success: [
        "You tighten the last knot and drag a fingertip up {client}'s bound arms. {They} shiver{s} and try{es} to press toward you.",
        "Bound and helpless, {client} strains against the silk cord — not to escape, but to get {their} hands on you.",
        "You take your time fucking {client} slowly, and {they} can do nothing with {their} bound wrists but feel every thrust.",
        "You circle {client} slowly, letting {them} feel your eyes stripping {them} bare while {they} can't cover anything.",
        "A fingernail dragged down a bound wrist makes {client}'s {cock} jump and {them} whimper.",
        "You push {client} down by the shoulder and they fold without the arms to catch {them} — and go hard from the vulnerability of it.",
        "{Client} pull{s} against the cord, not to escape, just because {they} want to touch you and can't — {they} moan{s} at the fact of it.",
        "You lean close to {client}'s ear while {they} {are} still bound and describe exactly what you're going to do — {their} {cock} throb{s}."
      ],
      high: [
        "Bound wrists straining against the silk, {client} pushes toward you begging softly to be allowed to cum.",
        "You bring {client} to the edge and hold {them} there, wrists tied and {cock} dripping, trembling."
      ],
      fail: [
        "A knot slips loose and the spell breaks. {Client} immediately reaches for you.",
        "{Client} tenses against the cords and goes pale — too tight. You loosen them at once and start again."
      ],
      repeat: ["The tied wrists have lost their novelty and {client}'s {cock} reflects it."],
      focus: ["You draw the cords tighter and take complete control, and {client} trembles and leaks for you."],
      finish: {
        success: [
          "You bring {client}'s {cock} to the edge with your hands and then pull away — and {they} cum{s} untouched, {cock} jerking against nothing, wrists straining the cord with a fractured, helpless sound.",
          "You decide when {client} gets to finish — and when you give it to {them}, they spill{s} hard, {cock} spending while {their} bound hands can do nothing but fist and shake.",
          "You tighten the cords one fraction as {client}'s {cock} drips, and the restraint breaks {them} open — {they} cum{s} with both wrists straining and a raw, desperate cry, completely at your mercy.",
          "You watch {client}'s {cock} throb untouched and let {them} spend — wrists in the silk, nothing to grab, nothing to control, completely ruined by you."
        ],
        expert_success: [
          "You've learned exactly how long to hold {client} at the edge — long enough that when you finally give permission, their {cock} floods the air with a helpless, fractured sound, wrists pulling against the cord like {they} forgot {they} were tied.",
          "You brought {client} here deliberately, step by step — the silk, the waiting, the withheld touch — so their {cock} spends in one crashing wave the moment you let it, bound hands shaking, nothing held back."
        ],
        dressed_success: [
          "Still dressed except where it matters, {client} cum{s} with {their} wrists bound and {their} {cock} bare — the contrast somehow making it worse for {them} in the best way.",
          "Clothed and tied and spending: {client}'s {cock} jerks free of {their} clothing as {they} cum{s}, helpless in the cords and the clothes both."
        ],
        fail: [
          "A knot goes wrong at the worst moment and {client}'s wrists slip free, and with {their} hands back the spell breaks clean.",
          "Bound and wanting but not quite there — {client}'s {cock} goes soft in the cords without the finish."
        ]
      }
    },
    spanking: {
      start: [
        "You draw {client} across your lap with a firm hand and run your palm over {their} bare ass while {they} wait{s}.",
        "You pat your thigh once. {Client} know{s} what it means and folds {themselves} over your lap without a word, {cock} already pressing hard against your leg.",
        "You pull {client} across your lap by the wrist and run a flat palm over {their} exposed ass in one long, warning stroke before the first slap lands."
      ],
      success: [
        "The first crisp slap makes {client} gasp and jerk. The second makes {them} moan and push back for more.",
        "You alternate sharp smacks with slow stroking, and {client} squirms and whimpers across your lap.",
        "{Client} presses {their} ass back into your hand, {cock} hard against your thigh, wanting every hit.",
        "You keep a slow, stinging rhythm and {client}'s ass warms to a deep flush beneath your palm.",
        "{Client} gasps at each slap and turns to ask for another before the sting fades.",
        "You soothe the sting with a slow rub, and {client} melts — then you slap again and {they} cry{es} out.",
        "{Client}'s {cock} leak{s} against your thigh with every hit, and {they} grind{s} against you in between.",
        "The wet slap of palm on skin fills the room and {client}'s breathing gets ragged and thin."
      ],
      high: [
        "{Client} squirms and grinds across your lap, {cock} leaking, ass red and begging for more.",
        "With every slap {client} gets closer — {cock} dripping, ass burning, about to cum untouched."
      ],
      fail: [
        "Too hard, too fast. {Client} yelps and twists away. You stop and soothe the sting at once.",
        "Your rhythm is off and it bites rather than burns. {Client} goes tense instead of pliant."
      ],
      repeat: ["The same spanking rhythm again, and {client}'s {cock} has stopped twitching at each slap."],
      focus: ["You find a fast, merciless pace, and {client} loses all composure across your lap, {cock} throbbing."],
      finish: {
        success: [
          "You land a sharp slap and hold your palm there, feeling {client}'s ass burn under your hand — {they} cry{es} out sharp and cum{s}, {cock} jerking untouched against your thigh.",
          "You hit hard and then soothe and then hit hard again — and {client} goes rigid across your lap and spill{s}, {cock} spending against your leg, ass red and shaking.",
          "You keep the pace steady and feel {client}'s hips grinding harder against you — then {they} cum{s} from your hand alone, {cock} flooding your lap in wet, helpless pulses.",
          "One last flat-palmed slap to {client}'s burning ass and {they} grind{s} into your thigh and cum{s} — loud, messy, completely undone, and not a single finger on {their} {cock}."
        ],
        expert_success: [
          "You've calibrated every slap tonight — harder, then softer, then precisely the right hit to that exact spot — and when {client}'s {cock} starts dripping you know {they} {are} there. One deliberate palm strike and {they} cum{s} untouched, crying out.",
          "You held {client} to the same rhythm long enough that {their} {cock} was dripping before you changed pace — and when you did, one sharp hit sent {them} over. {They} spill{s} against your lap with a raw, helpless sound, ass on fire."
        ],
        fail: [
          "Too close and then the rhythm stutters. {Client} go{es} still across your lap, {cock} still hard, the orgasm withdrawn.",
          "{They} squirm{s} off your lap without finishing, ass red but {cock} soft, the balance never quite found."
        ]
      }
    },
    roleplay: {
      start: [
        "Tonight you wear a different name and {client} is the lord, the prisoner, the knight — and both of you commit to it completely.",
        "You set the scene with a single look and a slow circle around {client}, and they slip into the character before you've said a word — {cock} already responding to the fiction.",
        "You name the roles and {client} take{s} theirs instantly, voice dropping, posture shifting — and when you touch {them} in character, {their} {cock} hardens like the game is already real."
      ],
      success: [
        "You stay perfectly in character while you fuck, and {client} falls deeper into the fantasy with every thrust.",
        "You deliver a line so perfect that {client} flush{es} scarlet and moans into it.",
        "The game takes on a filthy life of its own and {client} is utterly lost in the fantasy you're building.",
        "You lean into the scene hard — begging, commanding, whatever the role calls for — and {client} follows you deeper in.",
        "{Client} plays along breathlessly, eyes blown dark, {cock} or cunt aching with the fiction of it.",
        "You stay in character through everything — {cock}, hands, voice — and {client}'s grip on the fiction tightens with each exchange.",
        "{Client} says something in-scene that breaks you for a half-second — then you recover and give {them} something that breaks {them} back.",
        "The fiction and the fucking blur together and {client}'s moan{s} {are} entirely genuine despite the performance."
      ],
      high: [
        "The fantasy reaches its peak and {client} is so deep inside it {they} forget{s} {they} {are} paying for this.",
        "{Client} forgets where the game ends and the real fucking begins."
      ],
      fail: [
        "You lose your character's voice mid-scene and {client}'s illusion cracks visibly.",
        "{Client} improvises a line you don't follow, the scene stalls, and someone laughs awkwardly."
      ],
      repeat: ["The same scene again, and {client} already knows exactly how it ends."],
      focus: ["You commit entirely to the role — voice, body, every word — and {client} forgets there was ever anything else."],
      finish: {
        success: [
          "You stay perfectly in character as {client}'s {cock} throbs inside you — {they} spend while the scene is still running, hips snapping, voice cracking, the fiction and the orgasm completely tangled.",
          "You give {client} the line their character needed to hear and feel their {cock} flood you in answer — {they} lose{s} the scene entirely, the character dropping away into something raw and real.",
          "{Client} speak{s} {their} character's last line and then fall{s} apart — {cock} jerking, voice breaking, the performance dissolving into a genuine, helpless finish.",
          "The scene reaches its climax and you clench your cunt around {client}'s {cock} right on cue — {they} cum{s} with the fiction still going, and the sound {they} make{s} is completely real."
        ],
        expert_success: [
          "You built the scene to lead here — every line of dialogue, every touch, all staged to put {client} exactly where they'd break — and when their {cock} throbs inside you, you say the one line that finishes it. {They} cum{s} with their character's voice cracking.",
          "You've played {client}'s scene so deeply that the fiction *is* the fucking by now — so when you deliver the moment, their {cock} spends inside you with a raw, uncontrolled sound that has nothing to do with performance."
        ],
        fail: [
          "The scene breaks at the worst moment and {client}'s {cock} decides it can't suspend disbelief while going soft.",
          "{Client} start{s} to laugh mid-scene, and the laughter is not the kind that leads anywhere good."
        ]
      }
    },
    sensory_deprivation: {
      start: [
        "You tie a strip of dark silk over {client}'s eyes and step back. Now {they} can only listen and feel and wait.",
        "You bind the silk over {client}'s eyes, tying it firm — {they} try to orient by sound alone and flinch when you move somewhere unexpected.",
        "Blindfold tied, you don't touch {client} for a long moment — just let them hear you moving in the room. By the time your hands land, {their} {cock} is fully hard from the waiting."
      ],
      success: [
        "Blindfolded and straining, {client} gasps at every touch that lands without warning.",
        "You let the silence build until {client} is trembling, then drag your tongue along {their} throat. {They} jump{s} and moan{s}.",
        "Every sensation lands twice as hard in the dark — a single fingertip on {client}'s {cock} draws a desperate sound.",
        "You let the silence stretch until {client} is panting just from anticipation, then touch {them} exactly where {they} least expected.",
        "Every touch lands somewhere new and {client} has stopped trying to predict it.",
        "You blow warm breath across {client}'s {cock} without touching it, and {they} twitch{es} and strain{s} toward you.",
        "{Client}'s whole body go{es} taut when you touch {them} — the blindfold makes everything land like the first time.",
        "You drag a nail slowly down {client}'s spine and {they} gasp{s} so sharp it almost sounds like pain — then moan{s} to clarify that it isn't."
      ],
      high: [
        "Blind and shaking, {client} cries out at the lightest brush of your lips anywhere near {their} {cock}.",
        "{Client} gasps and bucks at every touch now, utterly undone by not knowing where it'll land."
      ],
      fail: [
        "{Client} grows genuinely uneasy in the dark and tugs the blindfold up with bound hands.",
        "You knock over a cup and the sharp sound kills the suspense entirely."
      ],
      repeat: ["{Client} has learned to anticipate where your hands are going and the surprise is gone."],
      focus: ["You overwhelm {client} with touch after touch in rapid succession and {they} can't catch {their} breath or composure."],
      finish: {
        success: [
          "You touch {client} where they can't anticipate and feel {their} {cock} throb — you wrap your hand around it and stroke through the orgasm as {they} cum{s} blind, helpless, arching into the dark.",
          "You put your mouth on {client}'s {cock} without warning and swallow once — {they} cry{es} out and spill{s} immediately, {cock} jerking between your lips, unable to see or brace.",
          "You grip {client}'s {cock} and feel it flood your hand — {they} cum{s} from a touch {they} never saw coming, arching off the bed, sightless and completely broken.",
          "You feel the {cock} pulse in your hand before you hear the sound — then you close your grip and stroke {client} through every throb as {they} cum{s} loud and shaking, still blind."
        ],
        expert_success: [
          "You've spent this session mapping every place {client}'s body flinches — now you touch them in the sequence that breaks them, the one they can't predict, and wrap your hand around their {cock} the moment it swells. {They} flood your palm with a startled cry.",
          "You withheld touch long enough that {client} was shaking from anticipation alone — and when you finally wrapped your hand around their {cock} and stroked once, they cum{s} immediately, unable to see, unable to stop, completely yours."
        ],
        fail: [
          "The darkness held too much anxiety and not enough heat — {client}'s {cock} goes soft under the blindfold without the orgasm.",
          "{They} pull{s} the silk off {their} eyes, blinking, {cock} still hard but the moment gone. {They} needed to see."
        ]
      }
    },
    temperature_play: {
      start: [
        "A cup of chilled wine in one hand and a candle still warm with dripped wax in the other. You let {client} stare at both and wonder.",
        "You tilt the candle until wax pools at the lip, then tip it slow over {client}'s chest — {they} hiss{es} at the sting of it, {cock} jumping, and say nothing to stop you.",
        "Ice from the cup, wax from the candle: you don't explain which comes next, and {client}'s {cock} is hard before you've touched {them} at all."
      ],
      success: [
        "You drip warm wax across {client}'s chest then press the cold cup against {their} skin. {They} gasp{s} at the contrast.",
        "You trail a cold, wine-wet finger down {client}'s stomach toward {their} {cock}, and {they} shiver{s} all the way down.",
        "{Client} never knows if the next sensation is cold or burning, and {they} love{s} every second of not knowing.",
        "You breathe warm air on {client}'s {cock}, then follow it with cold wine from your tongue. {They} buck{s}.",
        "{Client} shivers and flushes in the same breath, {cock} twitching between sensations.",
        "A trail of wax hardens on {client}'s stomach while you press something cold against {their} {cock} — {they} curse{s} and arche{s}.",
        "You peel dried wax off {client}'s skin with a slow drag of your thumbnail, and {they} inhale{s} sharply at the edge of sensation.",
        "{Client} can't tell if what you're touching {them} with is hot or cold anymore — {their} body has stopped knowing, just reacting."
      ],
      high: [
        "Hot wax and cold wine and hot mouth — {client} can't stop shaking, {cock} dripping.",
        "{Client} arches toward the next sensation with an open, begging mouth."
      ],
      fail: [
        "The wax drips too hot and {client} flinches back hard. You blow on the spot and apologize.",
        "The wine has gone tepid and the contrast falls flat against warm skin."
      ],
      repeat: ["Hot, then cold, then hot again — {client} knows the rhythm now and it has lost its bite."],
      focus: ["You alternate hot wax and cold wine faster and faster until {client} can't stop shaking."],
      finish: {
        success: [
          "You press your warm mouth to {client}'s {cock} and let cold wine drip from your tongue onto {their} thigh at the same moment — the contrast hits and {their} {cock} floods your mouth as {they} cum{s}.",
          "You grip {client}'s {cock} with your wine-chilled hand and breathe hot air against the head — and {they} spill{s} into your palm, burning and frozen all at once, shaking through the contradiction.",
          "You drip wax onto {client}'s chest and immediately press cold glass against {their} {cock} — {they} cry{es} out and cum{s} hard, still twitching between sensations.",
          "You time the wax perfectly — a single drop at the right instant — and feel {client}'s {cock} jerk in your hand and flood it, {their} mouth falling open on a long, wrecked sound."
        ],
        expert_success: [
          "You've mapped {client}'s responses all session — which temperature makes them gasp, which edge makes them buck — so you combine them in one deliberate sequence: cold grip, warm mouth, wax drop. {Their} {cock} floods your palm before the last sensation even lands.",
          "You know the exact pairing that breaks {client}: warm breath on the {cock}, cold wine on the inner thigh, in that order. You do it, and feel {their} {cock} throb and spill against your lips with a helpless, stunned sound."
        ],
        fail: [
          "The contrast lost its edge and {client}'s {cock} made up its mind — soft, finished with the game before the game was done.",
          "{They} lie{s} still, flushed and goose-pimpled, {cock} hard but the orgasm not coming no matter what temperature follows."
        ]
      }
    },
    dominance_and_submission: {
      start: [
        "You tell {client} to kneel and not touch {their} {cock} without your permission, and {they} obey{s} immediately.",
        "One word — \"kneel\" — and {client} go{es} down without hesitation, {cock} hardening from the single syllable of it.",
        "You point at the floor and {client} understand{s}. {They} kneel{s} and put {their} hands behind {their} back without being told to, and your {mycock} responds to the sight of it."
      ],
      success: [
        "You give an order — \"hands behind your back\" — and {client} obeys with a full-body shiver of pleasure.",
        "{Client} kneels at your feet, {cock} hard and untouched, waiting on your next word like a command.",
        "You decide when {client} may touch {their} own {cock} and when {they} may not. {They} love{s} every moment of asking.",
        "You lift {client}'s chin with one finger and they stare up at you, {cock} straining, not daring to move without leave.",
        "{Client} waits on your command, {cock} leaking onto the floor, too obedient to touch {themself}.",
        "You tell {client} not to move and they hold still while you take your time with {their} {cock} — the effort of obeying makes {them} shake.",
        "{Client} ask{s} permission in a low, strained voice and something about the asking makes you take your time answering.",
        "You push {client} where you want {them}, and {they} go{es} — and the ease of it makes {their} {cock} throb hard."
      ],
      high: [
        "\"Cum,\" you say, and {client} falls apart on command, {cock} jerking.",
        "{Client} trembles at your feet, {cock} dripping, needing nothing but your next word."
      ],
      fail: [
        "{Client} breaks a rule without realizing it and you both freeze, unsure what happens now.",
        "Your command comes out uncertain and {client} senses the wobble."
      ],
      repeat: ["The same orders again, and {client}'s {cock} has stopped jumping at each command."],
      focus: ["You give no quarter — every rule tightened, every touch denied — and {client} surrenders completely."],
      finish: {
        success: [
          '"Cum," you say, and {client} obey{s} — {cock} spending at the single word, {their} whole body breaking open on command.',
          "You give the word and {client} shatter{s} — {cock} pulsing, breath gone, {their} obedience paid in full.",
          "You keep {client} on the edge with nothing but silence and your eyes, then say \"now\" — and {their} {cock} floods {their} hand, a helpless, grateful cry torn out of {them}.",
          "You withhold permission until {client}'s {cock} is dripping and {their} voice is cracked with asking — then you nod, once, and {they} cum{s} with a wrecked, full-body shudder."
        ],
        expert_success: [
          "You've trained {client} exactly to this point: voice gone, {cock} straining, everything waiting on one word. You let the silence stretch three beats past comfortable, then give it — and {they} spend immediately, the orgasm breaking like it had been held behind a door.",
          "You know how long to hold {client} at the edge before the command lands loudest — so you wait, and watch {their} {cock} drip, and say the word at the exact moment it will undo {them} completely. {They} cum{s} with a raw, cracked sound, completely in your hands."
        ],
        fail: [
          "The command comes out wrong — uncertain, too late — and {client}'s {cock} decides not to obey.",
          "{Client} wait{s} for the word that never arrives with the right weight behind it, and the orgasm drains away untriggered."
        ]
      }
    },
    praise_kink: {
      start: [
        "You murmur what a good, obedient one {client} is being tonight, and watch {their} {cock} throb at the words.",
        "You cup {client}'s face and tell {them} they've been so good — and watch the effect travel from {their} face all the way down to {their} {cock}.",
        "\"Good\" is all you say, and {client}'s whole body respond{s} to it — {cock} hardening, shoulders dropping, eyes going soft and wanting."
      ],
      success: [
        "\"Such a good one,\" you murmur against {client}'s ear, and {their} {cock} jumps and leaks.",
        "You praise {client} for every small submission — staying still, not touching {their} {cock} — and {they} blush{es} to {their} throat.",
        "{Client} hangs on every word of approval like {their} {cock} is attached to your voice.",
        "\"Perfect,\" you whisper, and {client} whimpers and goes soft-limbed.",
        "Every word of genuine praise makes {client} flush deeper and get harder.",
        "You catch {client} doing something right and name it, specific and warm — {they} go{es} still and {their} {cock} pulse{s}.",
        "\"You're being so good for me\" lands like a hand around {client}'s {cock} — {they} exhale{s} ragged and say thank you.",
        "You praise the way {client}'s body respond{s} to you and {they} flush{es} to {their} ears and get{s} harder from hearing it described."
      ],
      high: [
        "You tell {client} what a perfect, good thing {they} {are}, and {they} come{s} apart from the words alone.",
        "{Client} hangs on your voice, {cock} throbbing, trembling at each compliment."
      ],
      fail: [
        "The praise sounds hollow and practiced, and {client}'s {cock} knows it.",
        "You overdo it until it tips into mockery, and {client} laughs awkwardly and shrinks."
      ],
      repeat: ["The same compliments again, and {client} has stopped believing them."],
      focus: ["You pour on the praise — low, certain, specific — and {client} melts and leaks under it."],
      finish: {
        success: [
          '"Good," you say, low and certain, and {client} cum{s} — {cock} jerking, cheeks flushed, the single word enough to break {them} open.',
          "You tell {client} {they} {are} perfect and {they} spill{s} from the words alone, {cock} pulsing, {their} whole face soft with gratitude and orgasm.",
          "{Client} cum{s} crying out at the praise — {cock} spending, voice cracking on the compliment that finally did it.",
          '"That\'s it — exactly that — you\'re perfect," and {client} is gone — {cock} flooding, {their} whole body answering your voice.'
        ],
        expert_success: [
          "You've learned exactly which words break {client} — not generic praise but the specific, true thing {they} need to hear — so you say it now, low and certain, and {their} {cock} floods as {they} cum{s} with a raw, grateful sound.",
          "You built {client} up slowly all session with exactly calibrated praise, and now you deliver the line that finishes it — \"you're perfect\" — and {their} {cock} spends in one helpless pulse, face completely open and undone."
        ],
        fail: [
          "The praise lands hollow at the end and {client}'s {cock} knows the difference — it softens before the finish.",
          "{They} {are} flushed and wanting and the orgasm is just out of reach because the words stopped ringing true."
        ]
      }
    },
    dirty_talk: {
      start: [
        "You lean close to {client}'s ear and describe, in precise filthy terms, exactly what you're going to do with {their} {cock}.",
        "You don't touch {client} yet — you just put your lips near {their} ear and describe, in exact detail, what you're about to do. {Their} {cock} is hard before you've finished the sentence.",
        "\"I'm going to—\" and you finish the sentence in a low voice that makes {client}'s {cock} twitch before you've laid a hand on {them}."
      ],
      success: [
        "You whisper what you're about to do to {client}'s {cock} next, and {they} groan{s} before you've even touched it.",
        "Your words paint pictures — wet and specific — that make {client} flush and reach down for {their} {cock}.",
        "Every whispered promise lands and {client} is half-undone by your voice alone before your hands move.",
        "You murmur exactly how you want {client}'s {cock} tonight, right against {their} ear, and {they} shiver{s}.",
        "Your low voice describes what you're doing in the moment while you do it, and {client} is breathless and leaking.",
        "You describe {client}'s own {cock} to {them} — how it looks, how it feels — and {they} go{es} rigid listening.",
        "You whisper something so specific that {client} let{s} out a sharp noise and grabs your arm.",
        "You narrate every move you're making while you make it, and {client} gasps at hearing it said aloud while feeling it happen."
      ],
      high: [
        "You whisper exactly when and how {they}'re going to cum, and {client} can't hold back another moment.",
        "{Client} is undone by your words alone — {cock} or cunt pulsing before you've touched {them}."
      ],
      fail: [
        "You trip over the words and the filth comes out wrong. The mood dies.",
        "{Client} finds the specific thing you said more funny than arousing."
      ],
      repeat: ["{Client} has heard your best lines now and they've lost their {cock}-stiffening power."],
      focus: ["You hold nothing back — every filthy thought narrated in real time — and {client} is barely breathing."],
      finish: {
        success: [
          "You narrate {client}'s orgasm as it happens — voice low and exact — and {they} cum{s} harder for being told how {they} {are} cumming.",
          "{Client} spill{s} to your words: you told {them} exactly when and how, and {their} {cock} obeyed every syllable.",
          "Your voice in {their} ear describing every pulse of {their} orgasm — {client} cum{s} loud and shaking, the filth and the finish inseparable.",
          "You tell {client} you can feel {them} cumming and that sends {them} further in — {cock} jerking, a wrecked sound, your words the last thing {they} hear before {they} fall apart."
        ],
        expert_success: [
          "You've been narrating {client}'s body back to {them} all session — what {their} {cock} looks like, what it feels like in your hand — so when you describe {them} cumming before it happens, {their} {cock} makes the words true. {They} spill{s} with a stunned, helpless sound.",
          "You built the filth to a precise pitch all session, and now you put your mouth to {client}'s ear and tell {them} exactly how {they} {are} going to cum — and {their} {cock} obeys every word, spending hard while you narrate every pulse."
        ],
        fail: [
          "The right words never came and {client}'s {cock} felt the absence — hard and wanting and the orgasm just not there.",
          "You ran out of the specific, right language at the wrong moment and {client}'s {cock} softened into the quiet."
        ]
      }
    },
    voyeurism: {
      tags: ["notouch"],
      start: [
        "You undress slowly by candlelight while {client} watches from the chair, told clearly that {their} hands stay on the armrests.",
        "You point {client} to the chair, wait until {they} {are} seated, then begin — slowly, without hurry, letting your clothes fall while {their} {cock} hardens and {their} hands stay very still.",
        "You undress with your back to {client} first, then turn — and the look on {their} face when you do is the whole point of the exercise."
      ],
      success: [
        "You let your clothes fall with deliberate slowness, giving {client} every inch, watching {them} strain to keep {their} hands still.",
        "{Client} grips the chair arms, {cock} visibly hard under {their} clothes, forbidden to touch and aching.",
        "You slide a hand between your own thighs while {client} watches, {cock} straining, forbidden to do the same.",
        "You move by candlelight — slow, deliberate, for {their} eyes only — and {client} forget{s} to breathe.",
        "{Client} leans forward in the chair, {cock} hard, rapt, knuckles white on the armrests.",
        "You make eye contact while you touch yourself and {client} groan{s} and grip{s} the chair harder, forbidden from doing anything about it.",
        "{Client}'s gaze track{s} every move you make, {cock} straining against {their} clothes, jaw tight from the restraint.",
        "You cross the room slowly and stop just out of reach, and {client} inhale{s} sharp and hold{s} {their} hands very deliberately still."
      ],
      high: [
        "{Client} is shaking in the chair, {cock} untouched and leaking, forbidden to reach for it.",
        "You hold {client}'s gaze while you touch yourself, and {they} can't bear another moment of watching."
      ],
      fail: [
        "You catch your sleeve on a hook and the show turns briefly comic.",
        "{Client} grows impatient and reaches for {their} own {cock} before you've given permission."
      ],
      repeat: ["{Client} has watched this show and craves participation now."],
      focus: ["You touch yourself in full view of {client} and make it bolder and slower, and {their} grip on the chair goes white-knuckled."],
      finish: {
        success: [
          "{Client} cum{s} in the chair untouched — {cock} spending through {their} clothes from watching alone, a wrecked sound escaping {them} as {their} hands stay white-knuckled on the armrests.",
          "You watch {client} spill {themself} from across the room, {cock} soaking {their} breeches, hands where you told {them} to keep {them}.",
          "{They} can't hold it anymore — {cock} pulsing through {their} clothing, a desperate, helpless groan from the chair, watching you finish the show.",
          "{Client} cum{s} forbidden to touch {their} own {cock}, watching yours, and the orgasm is entirely your doing and not a single touch."
        ],
        expert_success: [
          "You've learned {client}'s breaking point precisely — how long to hold eye contact, which angle does it, when to touch yourself — so you deploy all of it in sequence, and {they} cum{s} in the chair with a helpless sound, {cock} spending untouched through {their} clothes.",
          "You built the show to a deliberate peak — slow, then slower, then one exact move you know {client} can't survive — and watch {their} {cock} spend through {their} breeches as {they} lose control in the chair, hands white on the armrests, never allowed to help."
        ],
        fail: [
          "Watching wasn't enough — {client}'s {cock} wants what the eyes have been promised, and you give {them} neither.",
          "{They} shift{s} in the chair, {cock} hard and unsatisfied, the show over without the finish."
        ]
      }
    },
    exhibitionism: {
      start: [
        "You leave the shutters open a crack and take {client} anyway, both of you knowing anyone passing could hear.",
        "You open the window before you start, just enough — then you take {client} and make sure you're both loud about it.",
        "You push {client} toward the window, the street visible below, and take {them} right there where the light falls and the sound carries."
      ],
      success: [
        "Footsteps creak in the hall outside during a particularly loud moment, and {client} shivers and fucks you harder.",
        "The knowledge that anyone in the next room can hear the wet sounds you're making makes {client}'s {cock} throb.",
        "{Client} gasps at the thought of someone pressing an ear to the door right now and listening.",
        "Voices drift up from the street while you're both mid-fuck, and {client} shivers and bites {their} lip.",
        "The open shutter means every slap of skin and every moan carries. {Client} loves it.",
        "{Client} moan{s} louder than {they} meant to and freeze{s} for a half-second — then decide{s} not to care and keeps going.",
        "Someone passes in the hall mid-thrust and {client}'s {cock} pulse{s} with the thrill of it — {they} drive{s} in harder.",
        "You say {client}'s name loud enough to be heard through the door and {their} {cock} twitch{es} sharply."
      ],
      high: [
        "{Client} bites back a cry, {cock} or cunt pulsing, thrilled and terrified someone will hear.",
        "The risk of being caught fucking mid-orgasm pushes {client} right over the edge."
      ],
      fail: [
        "A face actually appears at the shutter and neither of you can laugh it off.",
        "{Client} realizes the risk is genuine and not fantasy, and the thrill turns to real anxiety."
      ],
      repeat: ["The thrill of fucking where someone might hear has worn off."],
      focus: ["You let yourself be loud — moan unguarded, say filthy things at full voice — and {client} trembles at the daring of it."],
      finish: {
        success: [
          "{Client} cum{s} at exactly the moment footsteps pass the door — {cock} pulsing, a gasp stifled badly, the risk and the orgasm hitting at once.",
          "{They} spill{s} with the shutters open and the street below and {their} {cock} spending loud enough for anyone to hear.",
          "The knowledge that someone might be listening is what breaks {client} — {they} cum{s} hard and only half-quietly, {cock} throbbing, daring them to knock.",
          "{Client} look{s} at the open shutter and cum{s}, loud, because that's the whole point — {cock} pulsing, nothing held back, the city below invited to witness."
        ],
        expert_success: [
          "You planned the moment — open shutter, voices audible below, and you at full voice when {client}'s {cock} swells inside you — so you clench your cunt and moan loud and deliberate, and {they} cum{s} in a crashing wave, exposed to everyone and utterly wrecked by it.",
          "You timed {client}'s finish to the footsteps in the hall — you've done this long enough to feel the {cock} twitch, and you let yourself go loud right when they pass. {Client} cum{s} in a helpless, half-stifled rush, {cock} flooding you while the sound carries."
        ],
        fail: [
          "Someone actually does knock and {client}'s {cock} makes its feelings known by going immediately soft.",
          "The fantasy of being heard collapsed into the reality of being heard, and the orgasm went with the thrill."
        ]
      }
    },
    foot_fetish: {
      start: [
        "You stretch a bare foot into {client}'s lap and watch {their} {cock} harden before you've done anything at all.",
        "You sit on the edge of the bed and extend one bare foot toward {client} — {they} take{s} it in both hands like something offered, {cock} already half-hard.",
        "You press the sole of your foot flat against {client}'s {cock} through {their} clothes and hold it there, watching {their} face — {their} breath go{es} ragged immediately."
      ],
      success: [
        "You drag your bare sole slowly up {client}'s inner thigh toward {their} {cock}, and {they} let{s} out a shaking breath.",
        "{Client} cradles your foot in both hands, pressing {their} lips to the arch like it's something sacred.",
        "You press the ball of your foot against {client}'s {cock} and rub slowly, and {they} groan{s} with open want.",
        "You point your toes and stretch, ankle rolling, and {client} follow{s} every movement with hungry eyes.",
        "{Client} kisses up the arch of your foot to your ankle, {cock} hard and leaking against the floor.",
        "{Client}'s mouth is on the sole of your foot, and the sound {they} make{s} while kissing it is entirely unguarded.",
        "You curl your toes against {client}'s {cock} and feel it jerk under your foot — {they} groan{s} and press into it.",
        "{Client} hold{s} your foot against {their} face and breathe{s} through the feeling of it, {cock} throbbing."
      ],
      high: [
        "You work {client}'s {cock} between your feet and {they} {are} shaking, close to cumming onto your soles.",
        "{Client} is on {their} knees at your feet, {cock} in hand, breathless with devotion."
      ],
      fail: [
        "You press a little too hard and {client} winces — wrong kind of pressure.",
        "Your foot is cold from the stone floor and {client} yelps instead of moans."
      ],
      repeat: ["{Client} has had {their} fill of worshipping feet for this session."],
      focus: ["You work {client}'s {cock} with your foot exactly how {they} crave{s} it and {they} can barely hold {themself} together."],
      finish: {
        success: [
          "{Client} cum{s} onto your feet — {cock} spending over your soles and between your toes, {their} whole body shaking with the devotion of it.",
          "{They} groan{s} and spill{s} with your foot pressed to {their} {cock}, lips still at your ankle, cum warm across your arch.",
          "{Client} come{s} apart kneeling at your feet — {cock} jerking, both hands wrapped around your foot, the orgasm wrenched out of {them} by something as simple as your arch against {their} lips.",
          "You feel {client} cum{s} against your sole, {cock} throbbing, a low, worshipful sound escaping {them} as {they} spend themselves on your feet."
        ],
        expert_success: [
          "You've learned the exact pressure and angle that breaks {client}: sole against the {cock}, toes curled, heel pressed just so — so you give it to {them} now, deliberate and unhurried, and {they} cum{s} over your feet with a shaking, reverent sound.",
          "You held {client} on the edge for three long minutes with nothing but the arch of your foot against {their} {cock} — and when you curl your toes and press down, {they} spend across your sole with a raw, helpless moan, the whole body giving."
        ],
        fail: [
          "The devotion built to nothing — {client}'s {cock} goes soft mid-worship, the reverence outpacing the arousal.",
          "{They} set{s} your foot down gently, {cock} soft, the session over without the finish."
        ]
      }
    },
    impact_play: {
      start: [
        "You test a leather strap against your own palm — a sharp crack — and {client} flinches at the sound, then gets hard.",
        "You let {client} see the strap before you do anything with it — the sight alone gets {their} {cock} half-hard and {their} breathing shallow.",
        "You snap the strap once in the air and {client}'s {cock} jump{s} at the sound — you haven't touched {them} yet and {they} {are} already somewhere else."
      ],
      success: [
        "The strap lands across {client}'s ass with a crack, and {they} let{s} out a sharp, delighted cry.",
        "You find a slow, measured rhythm with the strap, and {client} sink{s} into the burn.",
        "Each deliberate stroke leaves {client} shaking and clenching, wanting the next before the sting fades.",
        "You lay the strap in slow, even strokes, and {client} goes pliant and hard under the rhythm.",
        "{Client} braces for each stroke, then exhales into it, {cock} or cunt aching from it.",
        "You pause between strokes to let the sting bloom — {client} wait{s} in tense, wanting silence for the next.",
        "{Client}'s ass i{s} flushed deep and hot under your hand between strikes, and {they} push{es} back for more.",
        "The crack of leather on skin fills the room and {client} count{s} each one under {their} breath, barely holding together."
      ],
      high: [
        "Each stroke draws a sharper cry from {client}, closer and closer to cumming from the sting alone.",
        "{Client} trembles under the strap, ass red and {cock} dripping, begging for the next."
      ],
      fail: [
        "A stroke lands wrong — too sharp, wrong angle — and you stop immediately to check {client}.",
        "You hesitate too long between strokes and the anticipation fizzles to nothing."
      ],
      repeat: ["The same strokes in the same rhythm. {Client}'s ass has gone a little numb to it."],
      focus: ["You quicken the strokes and put real force behind each one, and {client} cries out with every hit."],
      finish: {
        success: [
          "{Client} cum{s} from the strap alone — {cock} spending untouched as the last stroke lands, a sharp, helpless cry, ass red and hips still bucking.",
          "You bring the strap down one final time and {client} fall{s} apart — {cock} jerking, voice breaking, the pain and the orgasm arriving together.",
          "{They} had been close for three strokes and the fourth breaks {them} — cum striping the sheets, a raw sound, ass burning under your hand.",
          "{Client} spill{s} while the sting is still fresh — {cock} untouched and spent, {their} whole body shaking with the rhythm you built into {them}."
        ],
        expert_success: [
          "You've calibrated every stroke tonight — force, interval, placement — so when {client}'s {cock} starts dripping you already know the next hit will finish {them}. You bring the strap down with precision and {they} cum{s} with a cracked cry, ass burning, {cock} spending untouched.",
          "You've kept {client} at the exact threshold for four strokes, reading the {cock} for how close it is — and now you quicken the pace by one, land the hit at the right spot, and {they} fall apart. {They} spill{s} with a raw sound, the sting and the orgasm inseparable."
        ],
        fail: [
          "The strap's rhythm never found the right pace and {client}'s {cock} softened between strokes without the finish.",
          "{They} shift{s} away from the next hit — not in play, just done — {cock} soft, the session over before the orgasm."
        ]
      }
    }
  },

  /* Pose-neutral fallbacks for any technique without its own lines. */
  skills: {
    vaginal: {
      success: ["You find a wet, easy rhythm and {client} sink{s} into it with a low moan.", "You fuck {client} slow and then less slow, cunt working {their} {cock}.", "You set the pace and {client} take{s} it gladly, hands wherever {they} want{s} them."],
      fail: ["You can't find the right angle and {client} shift{s} beneath you, distracted.", "Your body is willing but your timing is off and {client} notices the mismatch."],
      repeat: ["The same fucking rhythm again and {client}'s attention has started to drift."]
    },
    oral: {
      success: ["You take your time on {client}'s {cock} — slow and attentive — and {their} fingers go tight in the sheets.", "Slow, then deliberate: {client} let{s} out a long, low, helpless sound that fills the room."],
      fail: ["You lose the rhythm on {their} {cock} and {client} tense{s} instead of melting.", "{Client} shift{s} away with a small, polite noise. Not quite what {they} needed."],
      repeat: ["{Client} know{s} this move on {their} {cock} now and it has lost its edge."]
    },
    manual: {
      success: ["Your hands are clever and oiled and unhurried and {client} shiver{s} at every stroke.", "Warm oil and sure hands: {client} go{es} loose and pliant as you work {their} {cock} or cunt."],
      fail: ["Your hands are cold or clumsy — or both — and {client} flinch{es}.", "{Client} squirm{s} away from a touch that tickles rather than thrills."],
      repeat: ["The same strokes on {client}'s {cock} again and {their} skin has stopped rising for it."]
    },
    kink: {
      success: ["You take control and {client} surrender{s} with a shaky, grateful breath.", "You make {client} wait and the waiting and the hard {cock} are the whole point."],
      fail: ["Your command comes out uncertain and the dynamic breaks.", "You misjudge it and {client} pull{s} back. You ease off and recalibrate."],
      repeat: ["{Client} know{s} what's coming now and {their} {cock} has stopped jumping at it."]
    },
    performance: {
      success: ["You put on a show and {client} can't look anywhere else, {cock} hard from watching.", "A slow smile, a low voice, a well-timed pause: {client} is captivated and dripping."],
      fail: ["You break character and {client} see{s} the gap between the show and the person.", "{Client} isn't buying it tonight."],
      repeat: ["You've run this scene already and {client} know{s} how it goes."]
    },
    _default: {
      success: ["It works, and {client}'s {cock} — or cunt — responds."],
      fail: ["It doesn't land and {client} shift{s}, distracted and half-soft."],
      repeat: ["The same move again and {client} is growing bored of it."]
    }
  },

  /* The general approaches in the encounter menu. Kept pose-neutral. */
  approaches: {
    tease: {
      success: [
        { t: "You pull away just as {client} lunges toward you, and {their} {cock} throbs visibly at the denial.", not: ["bound", "away"] },
        { t: "You breathe warm air against {client}'s {cock} without touching it, and {they} shiver{s} from root to tip.", not: ["notouch"] },
        "You make {client} wait and beg and the needing does half your work before you touch {them} at all."
      ],
      fail: [
        "You tease a beat too long and {client} goes from wanting to annoyed.",
        "{Client} doesn't understand the game and just looks confused with a softening {cock}."
      ]
    },
    focus: {
      success: ["You stop holding back and take {client}'s {cock} in hand with real intent, and {they} cry{es} out.", "You give {client} everything at once — mouth and hands and cunt — and {they} come{s} apart completely."],
      fail: ["You push too hard and too fast and {client} wince{s} from overstimulation.", "All that focused effort and it lands wrong. You're breathing hard and {client}'s {cock} is softer for it."]
    },
    recover: {
      success: [
        "You ease off and let the urgency settle, both of you catching your breath.",
        "You trade the frantic pace for stillness and {client} doesn't seem to mind at all — {cock} still hard.",
        { t: "A sip of wine, a lazy wet kiss, a moment to let your cunt stop clenching so desperately.", not: ["notouch", "away"] }
      ],
      fail: ["You try to slow your racing pulse but your body won't settle.", "The recovery pause stretches into awkward quiet."]
    },
    command: {
      success: [
        "\"Still,\" you say, and {client} goes absolutely still, {cock} twitching, waiting on your word.",
        "You set the pace and dare {client} to match it. {They} can't — and {they} love{s} knowing {they} can't.",
        "One look from you, and {client} put{s} {their} hands exactly where you want them."
      ],
      fail: ["Your command comes out uncertain and {client} hesitate{s} instead of obeying.", "{Client} pushes back on your order and the whole dynamic comes apart."]
    }
  },

  /* Undressing. Tokens {garment}, {lower}, {lace} match the client's clothes
     (gown, skirts, bodice laces / shirt, breeches, doublet laces). */
  undress: {
    slow: {
      success: [
        "You work {client}'s {lace} loose one tie at a time, breath on {their} neck, and {they} shiver{s} with every inch of skin you uncover.",
        "You slide {client}'s {garment} off {their} shoulders and kiss every bit of bare skin before it goes, until {they} {are} naked and shaking.",
        "Slowly, with deliberate care, you strip every piece of clothing from {client} until {their} {cock} — hard, flushed — is finally bare between you."
      ],
      fail: ["A knot in {client}'s {lace} defeats your fingers and the mood stutters.", "You pull the wrong tie and {client} laugh{s} nervously while {their} {cock} goes half-soft."]
    },
    rush: {
      success: [
        "Too impatient, you yank {client}'s {lower} aside and get your mouth on {them} before {they} can blink.",
        "You haul {client}'s {lower} out of the way in one motion and {they} gasp{s} at the hurry and the sudden exposure.",
        "No time for laces — you shove the fabric aside, and {client}'s {cock} is in your hand before {they} knew it was coming."
      ],
      fail: ["The fabric bunches and snags and you both have to stop and wrestle with it.", "You pull too hard and something tears. {Client} isn't pleased about the {lace}."]
    },
    self: {
      success: [
        "You undress yourself with deliberate slowness — one piece, then another — while {client} watches {their} {cock} grow harder with each reveal.",
        "You step out of your clothes and stand bare in the candlelight, unhurried, while {client} stare{s} openly.",
        "You undress for {client} like a gift unwrapped slowly — every inch savored, every reveal held a moment too long."
      ],
      fail: ["A stubborn lace makes a wreck of the show.", "You stumble stepping out of your clothes and the erotic moment tumbles with you."]
    }
  },

  /* Group encounters. {client} is the partner you're focused on; {other} is another guest. */
  group: {
    open: [
      "{Client} and {other} arrive together, sharing a look that says they've discussed what they want from you.",
      "Two of them and one of you. {Client} grins and reaches for you first; {other} blushes but {their} {cock} is just as interested.",
      "You lead {client} and {other} upstairs, a hand in each of theirs, already deciding the order."
    ],
    spill: [
      "{Other} watches, {cock} hardening visibly.",
      "{Other} reach{es} for you too, not willing to wait and watch any longer.",
      "{Other} press{es} in close behind you, {cock} against your back, lips at your shoulder.",
      "Across the bed, {other} touch{es} {themself} watching, breath quickening."
    ],
    together: {
      success: [
        "You pull {client} and {other} together and work both of them at once, mouth and hands full.",
        "Mouths and hands and slick skin everywhere — for a breathless moment all three of you move as one.",
        "You weave between them, and both {client} and {other} moan your name in the same breath."
      ],
      fail: ["You try to take both of them at once and end up satisfying no one.", "Someone's elbow, someone's knee, wrong holes and crossed limbs — the moment tangles past saving."]
    },
    finish: {
      success: ["The room is warm and slick and quiet at last, everyone spent and smiling.", "They leave arm in arm, thoroughly drained, promising to come back together."],
      partial: ["Some of them leave grinning; the rest pull on their clothes with the quiet of the unsatisfied.", "Not everyone got fucked the way they wanted, and everyone knows it."],
      fail: ["They dress in silence, avoiding each other's eyes, moods sour.", "More awkward tangle than orgy. They leave with nothing between them but disappointment."]
    }
  },

  /* couple: narration for pre-formed couples — they know each other, have a dynamic, and you're the third party invited into it */
  couple: {
    open: [
      "{Client} lets {other} through the door first, a small automatic courtesy that tells you everything about who leads.",
      "They come in with the ease of people who've shared a bed for a long time. {Client} glances at {other} and then at you — the question has already been discussed.",
      "You can read it immediately: {client} is excited and hiding it; {other} wanted this more. They've negotiated the terms between themselves.",
      "{Client} and {other} stand close in the way people do when they're used to each other's gravity. {Other} speaks first. \"We were told you were the one to ask.\""
    ],
    spill: [
      "{Other} exchange{es} a glance with {client} — an old, fluent language between them.",
      "{Other} reach{es} for {client}'s hand, watching you work.",
      "{Other} murmur{s} something low to {client} that isn't meant for you, but {client} flush{es}.",
      "{Other} watch{es} you with {client} and you catch {them} biting {their} lip."
    ],
    together: {
      success: [
        "You bring them together, hands and mouths, and for a moment they're looking at each other through you — something wordless and old passing between them.",
        "All three of you tangled now, and {client} and {other} move around you the way people do when they share a body of water, unconsciously adjusting.",
        "You draw them both in and they find each other's hands without looking."
      ],
      fail: ["The two of them are too attuned to each other and not enough to you — the rhythm goes wrong.", "You get between them at the wrong moment and break something that was building. {Client} sighs."]
    },
    finish: {
      success: [
        "They leave the way they came in — close, easy, {client}'s hand at the small of {other}'s back. You gave them something to keep.",
        "Afterward they're quiet together, the good kind of quiet. {Client} squeezes {other}'s hand and doesn't let go. They came here for each other as much as for you."
      ],
      partial: [
        "One of them leaves satisfied; the other leaves understanding something about their relationship they didn't walk in with.",
        "{Client} looks at {other} and there's a private conversation happening that you're not part of. They'll be fine. But tonight didn't go the way they planned."
      ],
      fail: [
        "There's a stiffness between {client} and {other} as they dress. This was meant to be something they shared. It didn't land.",
        "They leave polite and careful with each other — which means you broke something small tonight. {Other} doesn't look at {client} on the way out."
      ]
    }
  },

  /* liked:    added after a technique's success line when the client loves it.
     disliked: REPLACES the success line when the client dislikes the technique,
               so a lukewarm reaction never follows a glowing one. Must stand alone. */
  /* Reactions to your body, when a client has a taste for one part of it (Body step in creation).
     like: you're what they wanted. dislike: you're the opposite. Keyed by body part, with general as a fallback.
     Shown once when the encounter opens, and again when you undress for them. */
  body: {
    like: {
      general: ["{Client} look{s} you over slowly and {their} {cock} fills the rest of the way. Exactly what {they} wanted.", "{They} can't quite hide how pleased {they} {are} with what {they}'ve paid for."],
      hairLen: ["{Client} wind{s} a fist in your hair and tug{s} just slightly, delighted.", "{They} keep{s} reaching to touch your hair as {they} fuck{es} you, unable to stop."],
      bust: ["{Client}'s eyes fix on your chest and {their} {cock} twitches at the sight.", "{They} cup{s} your breasts with both hands and exhale{s} at how well they fill the grip."],
      chest: ["{Client} press{es} a palm flat to your chest and leave{s} it there, appreciating the breadth.", "{They} run{s} an admiring hand across your chest as {their} {cock} gets harder."],
      rear: ["{Client}'s hand find{s} your ass and stay{s} there, squeezing, very pleased with the weight of it.", "{They} watch{es} you walk across the room to the bed with barely-concealed hunger."],
      thighs: ["{Client} rest{s} a hand high on your thigh and squeeze{s}, {cock} hard at the feel of it.", "{Their} eyes travel the length of your thighs and don't come back up for a while."],
      grooming: ["{Client} trail{s} an approving hand down below your navel and smile{s} at how bare or kept you are.", "{They} murmur{s} that you are exactly how {they} like{s} {them}."],
      endowment: ["When your clothes fall away, {client}'s breath catch{es}, and a slow, delighted grin follows the looking.", "{Client} stare{s} openly, {cock} already hard, and look{s} up at you with frank anticipation."]
    },
    dislike: {
      general: ["{Client} look{s} you over and can't quite hide the flicker of disappointment.", "{They} conceal{s} it well enough, but you see the moment {their} {cock} decides to be selective."],
      hairLen: ["{Client} glance{s} at your hair and {their} smile cools a fraction."],
      bust: ["{Client}'s gaze settle{s} on your chest and something dims briefly behind {their} eyes.", "{They} look{s} at your figure with the careful neutrality of someone recalibrating expectations."],
      chest: ["{Client} look{s} at your chest and you can tell it isn't what {they} pictured."],
      rear: ["{Client} give{s} your ass an appraising look that falls just short of approval."],
      thighs: ["{Client}'s eyes pass over your thighs without lingering."],
      grooming: ["{Client} pause{s}, slightly surprised by what {they} find{s}, and you sense it isn't how {they} prefer."],
      endowment: ["{Client} look{s} you over once you're bare and hesitate{s}, recalculating the evening.", "There's a beat of visible uncertainty on {client}'s face as the last layer comes off."]
    }
  },

  /* Reactions to your skill with a technique. master: success with Expert or Master mastery.
     novice: a failure with a technique you have little experience in. */
  mastery: {
    master: ["{Client} gasp{s} that {they} {are} in the hands of a genuine expert.", "{They} can tell you've done this exact thing a hundred times, and {they} adore{s} you for every one of them.", "{Client} break{s} off mid-moan to ask, breathless, where in hell you learned that.", "Your practiced precision leave{s} {client} speechless and thoroughly used."],
    novice: ["Your inexperience shows in the hesitation, and {client} notice{s}.", "{Client} gently adjust{s} your hand on {their} {cock} and the correction stings.", "You fumble the approach and {they} {are} too polite to say anything, but {their} {cock} notice{s}."]
  },

  liked: ["It's exactly what {they} came here for.", "{Their} whole body open{s} up for you.", "{They} murmur{s} your name into the skin of your neck.", "\"Yes — that,\" {they} breathe{s}."],
  disliked: [
    "{Client} go{es} along with it but it's clearly not what {they} wanted to be paying for.",
    "It works well enough, but {client} would plainly rather {their} {cock} be somewhere else.",
    "{Client} tolerate{s} it without complaint, but {they} {are} somewhere else in {their} head."
  ],

  /* How the client is doing after the turn, by satisfaction band and outcome. */
  reactions: {
    low: {
      success: ["A good start. {Their} {cock} is paying attention.", "{They} smile{s} and shift{s} closer.", "{They} {are} beginning to let themselves want it.", "{They} let{s} out a small, pleased sound and settle{s} in."],
      fail: ["{They} {are} still waiting for a reason to be hard.", "{Their} {cock} hasn't decided yet."]
    },
    mid: {
      success: ["{Their} breath is coming faster and {their} {cock} is fully hard.", "{They} {are} flushed and wet-lipped and struggling to stay still.", "A visible flush is spreading down {their} chest.", { t: "{Their} hands have started taking what they want.", not: ["bound", "notouch"] }, "{They} {are} well past pretending {they} can hold back."],
      fail: ["{They} {are} still warm and half-hard, but the heat is fading.", "{They} wait{s} for you to find your way back to the rhythm that was working."]
    },
    high: {
      success: ["{They} {are} shaking, {cock} or cunt pulsing, right on the edge.", "{They} can barely breathe.", { t: "{They} {are} gasping and clutching at you, {cock} throbbing.", not: ["bound", "notouch"] }, "{They} won't last another minute.", "Every breath {they} draw{s} is a plea to be allowed to finish."],
      fail: ["{They} {are} still close but the orgasm has backed off.", "{They} hover{s} on the edge, {cock} or cunt aching, waiting for you to bring {them} back."]
    }
  },

  /* Closing line on the results screen. Never used if trouble broke out. */
  finish: {
    success: [
      "{Client} sprawl{s} across the bed, {cock} soft and wet and {their} whole face loose with satisfaction.",
      "Afterward, {client} laugh{s} softly, dazed, and press{es} a kiss to your hand before finding {their} clothes.",
      "{They} take{s} a long time to find the strength to dress — just lying there in the mess you made together.",
      "{Client} dress{es} slowly, still glowing and slick, and promise{s} to ask for you by name next time."
    ],
    fail: [
      "{Client} dress{es} in silence, {cock} soft, the night already being revised into something less embarrassing.",
      "{They} leave{s} with a tight, practiced smile and the careful posture of someone pretending satisfaction.",
      "It ends with an awkward shrug and the sound of clothes being gathered from the floor without ceremony."
    ]
  }
};
