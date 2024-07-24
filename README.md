# jobPro
This website will consist of 3 applications running on React - a job tracker, an API for tailored resumes and cover letters and an extension to auto-fill the tracker during your job hunt


As this is the beginning of the project, I will use this Readme to describe the plan for the project:

Account
--------
change password
paste your CV
TODO:
(It would be cool to extract the text from either PDF or word doc instead of c+p, I have started implementation but it's not a priority right now.)

Job tracker
---------------------
The job tracker enables you to keep add new job applications/ companies you are researching and track your progress on it.
Currently I have implemented the back end (see jobPro-backend) and the relevant components to create/update and view individual applications. From the 'view all page you are able to drag and drop the applications to different stages.

TODO: Styling and clean-up
(Implement a tailor CV link to view application?)
(implement a next step suggestion?)

CV Tailor
----------
When you register as a user, you can add your CV to the account (up to 3 in total). When visiting the 'Tailor your CV' page, you 
will be prompted to choose a CV, a URL for the company you are applying for and a link for the job description. The API will generate a tailored resume based on your input and send you to a page to view your resume.

TODO:
Create good pathways to view all tailored CVs
Edit prompt to ensure OpenAI API only responds with the CV (get rid of 'sure!' type messages)
Style - it's currently all over the place.

Cover letter generator
------
Same as CV tailor but for cover letters.
Create the whole thing. When CV Tailor is complete I can re-use its code to quickly create it.

Google extension -  auto fill tracker based on web activity
----
TODO (haven't started this part.)