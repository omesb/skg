// start page temporary implemented in APP ?!

// delete graph
match (n) detach delete n;

// Abstract
create (KG_Task :Type {name: "KG_Task"})
create (KG_Subtask :Type {name: "KG_Subtask"})

// #region root Page Links
create (root :Navigation {
  name: "Start Navigation",
  label: "Choose a path",
  content: "This is the first Procrastination Page"
})
create (procrast :Info {
  name: "procrast",
  label: "Welcome to procrast",
  content: "This is the first Procrastination Page"
})
create (panic :Info {
  name: "panic",
  label: "Welcome to panic",
  content: "This is the first Procrastination Page"
})
create (planning :Info {
  name: "planning",
  label: "Welcome to planning",
  content: "This is the first Procrastination Page"
})
create (overwhelmed :Info {
  name: "overwhelmed",
  label: "Welcome to overwhelmed",
  content: "This is the first Procrastination Page"
})
create (diary :Info {
  name: "diary",
  label: "Welcome to diary",
  content: "This is the first Procrastination Page"
})
// #endregion

create (p1 :Info {
  name: "p1",
  label: "Procrastination Path",
  content: "This is the first Procrastination Page"
})

create (p2 :Decision {
  name: "p2",
  label: "Do you want to get productive?",
  yesColor: "HEX",
  noColor: "HEX"
})

create (p2y :Decision {
  name: "proc2",
  label: "are there urgent tasks you're avoiding?",
  yesColor: "HEX",
  noColor: "HEX"
})

create (p2n :Decision {
  name: "p2n",
  label: "enjoy being lazy :)",
  yesColor: "HEX",
  noColor: "HEX"
})

create (p2yy :Query {
  name: "Factory",
  label: "are there urgent tasks you're avoiding?",
  yesColor: "HEX",
  noColor: "HEX"
})

create (p2yn :Decision {
  name: "p2yy",
  label: "Do you want to plan something?",
  yesColor: "HEX",
  noColor: "HEX"
})

// root Relationships
create
  (root) -[:LINK]-> (procrast),
  (root) -[:LINK]-> (panic),
  (root) -[:LINK]-> (planning),
  (root) -[:LINK]-> (overwhelmed),
  (root) -[:LINK]-> (diary)

// procrast Path
create
  (procrast) -[:NEXT]-> (p1),
  (p1) -[:NEXT]-> (p2),

  (p2) -[:YES]-> (p2y),
  (p2) -[:NO]-> (p2n),

  (p2n) -[:NEXT]-> (root),

  (p2y) -[:YES]-> (p2yy),
  (p2y) -[:NO]-> (p2yn),

  (p2yy) -[:PULLS {props: ["urgent"]}]-> (KG_Task),
  (p2yy) -[:PULLS {props: ["urgent"]}]-> (KG_Subtask),
  (p2yy) -[:PUSHES {props: ["urgent"]}]-> (KG_Task),
  (p2yy) -[:NEXT]-> (:Page {name: "Page"}),

  (p2yn) -[:YES]-> (:Page {name: "Page"}),
  (p2yn) -[:NO]-> (root)
