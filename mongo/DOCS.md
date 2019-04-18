# katze v1.0.0



- [Day](#day)
	- [Create day](#create-day)
	- [Delete day](#delete-day)
	- [Retrieve day](#retrieve-day)
	- [Retrieve days](#retrieve-days)
	- [Update day](#update-day)
	
- [Elective](#elective)
	- [Create elective](#create-elective)
	- [Delete elective](#delete-elective)
	- [Retrieve elective](#retrieve-elective)
	- [Retrieve electives](#retrieve-electives)
	- [Update elective](#update-elective)
	
- [Program](#program)
	- [Create program](#create-program)
	- [Delete program](#delete-program)
	- [Retrieve program](#retrieve-program)
	- [Retrieve programs](#retrieve-programs)
	- [Update program](#update-program)
	
- [Semester](#semester)
	- [Create semester](#create-semester)
	- [Delete semester](#delete-semester)
	- [Retrieve semester](#retrieve-semester)
	- [Retrieve semesters](#retrieve-semesters)
	- [Update semester](#update-semester)
	
- [Team](#team)
	- [Create team](#create-team)
	- [Delete team](#delete-team)
	- [Retrieve team](#retrieve-team)
	- [Retrieve teams](#retrieve-teams)
	- [Update team](#update-team)
	
- [View](#view)
	- [Create view](#create-view)
	- [Delete view](#delete-view)
	- [Retrieve view](#retrieve-view)
	- [Retrieve views](#retrieve-views)
	- [Update view](#update-view)
	


# Day

## Create day



	POST /days


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| program			| 			|  <p>Day's program.</p>							|
| date			| 			|  <p>Day's date.</p>							|

## Delete day



	DELETE /days/:id


## Retrieve day



	GET /days/:id


## Retrieve days



	GET /days


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update day



	PUT /days/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| program			| 			|  <p>Day's program.</p>							|
| date			| 			|  <p>Day's date.</p>							|

# Elective

## Create elective



	POST /electives


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Elective's name.</p>							|
| prof			| 			|  <p>Elective's prof.</p>							|
| description			| 			|  <p>Elective's description.</p>							|

## Delete elective



	DELETE /electives/:id


## Retrieve elective



	GET /electives/:id


## Retrieve electives



	GET /electives


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update elective



	PUT /electives/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Elective's name.</p>							|
| prof			| 			|  <p>Elective's prof.</p>							|
| description			| 			|  <p>Elective's description.</p>							|

# Program

## Create program



	POST /programs


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| 			|  <p>Program's title.</p>							|
| time			| 			|  <p>Program's time.</p>							|

## Delete program



	DELETE /programs/:id


## Retrieve program



	GET /programs/:id


## Retrieve programs



	GET /programs


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update program



	PUT /programs/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| 			|  <p>Program's title.</p>							|
| time			| 			|  <p>Program's time.</p>							|

# Semester

## Create semester



	POST /semesters


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| year			| 			|  <p>Semester's year.</p>							|
| title			| 			|  <p>Semester's title.</p>							|
| teams			| 			|  <p>Semester's teams.</p>							|
| description			| 			|  <p>Semester's description.</p>							|

## Delete semester



	DELETE /semesters/:id


## Retrieve semester



	GET /semesters/:id


## Retrieve semesters



	GET /semesters


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update semester



	PUT /semesters/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| year			| 			|  <p>Semester's year.</p>							|
| title			| 			|  <p>Semester's title.</p>							|
| teams			| 			|  <p>Semester's teams.</p>							|
| description			| 			|  <p>Semester's description.</p>							|

# Team

## Create team



	POST /teams


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| persons			| 			|  <p>Team's persons.</p>							|
| abstract			| 			|  <p>Team's abstract.</p>							|
| name			| 			|  <p>Team's name.</p>							|
| image			| 			|  <p>Team's image.</p>							|

## Delete team



	DELETE /teams/:id


## Retrieve team



	GET /teams/:id


## Retrieve teams



	GET /teams


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update team



	PUT /teams/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| persons			| 			|  <p>Team's persons.</p>							|
| abstract			| 			|  <p>Team's abstract.</p>							|
| name			| 			|  <p>Team's name.</p>							|
| image			| 			|  <p>Team's image.</p>							|

# View

## Create view



	POST /views


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| content			| 			|  <p>View's content.</p>							|
| animation			| 			|  <p>View's animation.</p>							|
| name			| 			|  <p>View's name.</p>							|

## Delete view



	DELETE /views/:id


## Retrieve view



	GET /views/:id


## Retrieve views



	GET /views


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update view



	PUT /views/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| content			| 			|  <p>View's content.</p>							|
| animation			| 			|  <p>View's animation.</p>							|
| name			| 			|  <p>View's name.</p>							|


