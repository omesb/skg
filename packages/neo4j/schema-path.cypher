// delete graph
match (n) detach delete n;

// Abstract
create (KGClass :KGClass {name: "KGClass"})

// Page Classes
create (Page:Page {
  name: "Page"
})
create (Info:Info {
  name: "Info",
  label: "string",
  content: "html5",
  label: "string",
  content: "html5"
})
create (Decision:Decision {
  name: "Decision",
    label: "string",
  content: "html5",
  yesColor: "HEX",
  noColor: "HEX"
})
create (Navigation :Navigation {
  name: "Navigation",
  label: "string",
  content: "html5"
})
create (Query:Query {
  name: "Query",
  label: "string",
  content: "html5"
})

// Info Relationships
create
  (Info) -[:NEXT]-> (Page)

// Decision Relationships
create
  // (Decision) -[:UNSURE]-> (Page),
  (Decision) -[:YES]-> (Page),
  (Decision) -[:NO]-> (Page)

// Navigation Relationships
create
  (Navigation) -[:LINK]-> (Page),
  (Navigation) -[:LINK]-> (Page),
  (Navigation) -[:LINK]-> (Page)

// Query Relationships
create
  (Query) -[:PULLS {subquery: ":string"}]-> (KGClass),
  (Query) -[:PULLS {subquery: ":string"}]-> (KGClass),
  (Query) -[:PULLS {subquery: ":string"}]-> (KGClass),
  (Query) -[:CREATES]-> (KGClass),
  (Query) -[:NEXT]-> (Page)

