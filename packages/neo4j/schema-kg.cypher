// delete graph
match (n) detach delete n;

// Classes
create (Person :Person {
  uri: "schema:Person"
})
create (PageLink :PageLink {
  uri: ":PageLink",
  propertyFilters: "string[]"
})
create (Place :Place {
  uri: "schema:Place"
})
create (Task :Task {
  uri: ":Task"
})
create (Action :Action {
  uri: "schema:Action"
})
create (DiaryPath :DiaryPath {
  uri: ":DiaryPath"
})
create (Mood :Mood {
  uri: ":Mood"
})
create (Topic :Topic {
  uri: ":Topic"
})

// Person Relationships
create
  (Place)         -[:name {uri: "schema:name", key: "Name", required: true, priority: 0}]->                             (:Literal {uri: "xsd:string"}),
  (Person)        -[:givenName {uri: "schema:givenName", key: "First Name", required: true, priority: 0}]->             (:Literal {uri: "xsd:string"}),
  (Person)        -[:familyName {uri: "schema:familyName", key: "Last Name", required: false, priority: 0}]->           (:Literal {uri: "xsd:string"}),
  (Person)        -[:gender {uri: "schema:gender", key: "Gender", required: false, priority: 0}]->                      (:Literal {uri: "xsd:string"}),
  (Person)        -[:birthDate {uri: "schema:birthDate", key: "Birthdate", required: false, priority: 0}]->             (:Literal {uri: "xsd:date"}),
  (Person)        -[:knows {uri: "schema:knows", key: "knows", required: false, priority: 0}]->                         (Person)

// Task Relationships
create
  (Task)          -[:name {uri: "schema:name", key: "Name", required: true, priority: 0}]->                             (:Literal {uri: "xsd:string"}),
  (Task)          -[:isDone {uri: ":isDone", key: "", required: false, priority: 0}]->                                  (:Literal {uri: "xsd:boolean"})

// Action Relationships
create
  (Action)        -[:name {uri: "schema:name", key: "Name", required: true, priority: 0}]->                             (:Literal {uri: "xsd:string"}),
  (Action)        -[:actionStatus {uri: "schema:actionStatus", key: "actionStatus", required: false, priority: 0}]->    (:Literal {uri: "xsd:string"})

// Mood Relationships
create
  (Mood)          -[:name {uri: "schema:name", key: "Name", required: true, priority: 0}]->                             (:Literal {uri: "xsd:string"})

// Topic Relationships
create
  (Topic)         -[:name {uri: "schema:name", key: "Name", required: true, priority: 0}]->                             (:Literal {uri: "xsd:string"})

// DiaryPath Relationships
create
  (DiaryPath)     -[:name {uri: "schema:name", key: "Name", required: true, priority: 0}]->                             (:Literal {uri: "xsd:string"}),
  (DiaryPath)     -[:action {uri: "schema:action", key: "action", required: false, priority: 0}]->                      (Action),
  (DiaryPath)     -[:participant {uri: "schema:participant", key: "participant", required: false, priority: 0}]->       (Person),
  (DiaryPath)     -[:place {uri: "schema:place", key: "place", required: false, priority: 0}]->                         (Place),
  (DiaryPath)     -[:mood {uri: "schema:mood", key: "mood", required: false, priority: 0}]->                            (Mood)


