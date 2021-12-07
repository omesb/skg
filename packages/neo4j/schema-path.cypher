// Abstract
create (KGClass :KGClass {name: "KGClass"})

// Page Classes
create (Page:Page {
  name: "Page"
})
create (Info:Info {
  name: "Info",
  label: "string",
  content: "html5"
})
create (Decision:Decision {
  name: "Decision",
  yesColor: "HEX",
  noColor: "HEX"
})
create (Factory:Factory {
  name: "Factory"
})

// Info Relationships
create
  (Info) -[:NEXT]-> (Page)

// Decision Relationships
create
  // (Decision) -[:UNSURE]-> (Page),
  (Decision) -[:YES]-> (Page),
  (Decision) -[:NO]-> (Page)

// Factory Relationships
create
  (Factory) -[:QUERYS {subquery: ":string"}]-> (Class),
  (Factory) -[:CREATES]-> (Class),
  (Factory) -[:NEXT]-> (Page)
