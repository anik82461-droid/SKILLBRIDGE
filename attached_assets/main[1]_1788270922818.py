import json

def add_student():
    name = input("Enter student name: ")

    python = input("Python (yes/no): ")
    sql = input("SQL (yes/no): ")
    java = input("Java (yes/no): ")
    web = input("Web Development (yes/no): ")
    data = input("Data Analysis (yes/no): ")
    communication = input("Communication level: ")

    new_student = {
        "name": name,
        "python": python,
        "sql": sql,
        "java": java,
        "web": web,
        "data": data,
        "communication": communication
    }

    students.append(new_student)

    with open("students.json", "w") as file:
        json.dump(students, file, indent=4)

    print("Student added successfully!")


# Load existing students
try:
    with open("students.json", "r") as file:
        students = json.load(file)
except:
    students = []


# Add multiple students
while True:
    add_student()

    choice = input("Do you want to add another student? (yes/no): ")

    if choice.lower() == "no":
        break

print("All students added successfully!")
    

print("\n===== SIH SKILL MAPPING SYSTEM =====")

# Show available students
print("\nStudents available:")

for student in students:
    print("-", student["name"])

name = input("\nEnter student name: ")

# Find the student
selected_student = None

for student in students:
    if student["name"].lower() == name.lower():
        selected_student = student
        break

if selected_student is None:
    print("\nStudent not found!")
    exit()
else:
    print("\n===== SKILL ANALYSIS =====")
    print("Student:", selected_student["name"])

    skills = []

    if selected_student["python"].lower() == "yes":
        skills.append("Python")

    if selected_student["sql"].lower() == "yes":
        skills.append("SQL")

    if selected_student["java"].lower() == "yes":
        skills.append("Java")

    if selected_student["web"].lower() == "yes":
        skills.append("Web Development")

    if selected_student["data"].lower() == "yes":
        skills.append("Data Analysis")

    print("\nYour skills:")
    for skill in skills:
        print("✓", skill)

    print("\n===== CAREER RECOMMENDATION =====")

    if "Python" in skills and "Data Analysis" in skills:
        print("Recommended Domain: Data Science / Data Analysis")
        print("Internship: Data Analyst Intern")

    elif "Python" in skills and "SQL" in skills:
        print("Recommended Domain: Backend / Software Development")
        print("Internship: Python Developer Intern")

    elif "Java" in skills and "SQL" in skills:
        print("Recommended Domain: Java Development")
        print("Internship: Java Developer Intern")

    elif "Web Development" in skills:
        print("Recommended Domain: Web Development")
        print("Internship: Web Developer Intern")

    elif "Python" in skills:
        print("Recommended Domain: Python Development")
        print("Internship: Python Developer Intern")

    else:
        print("Recommended Domain: Beginner Software Development")
        print("Internship: Software Development Intern")

    print("\n===== SKILL GAP =====")

    all_skills = ["Python", "SQL", "Java", "Web Development", "Data Analysis"]

    missing_skills = []

    for skill in all_skills:
        if skill not in skills:
            missing_skills.append(skill)

    if missing_skills:
        print("Skills you can improve:")
        for skill in missing_skills:
            print("-", skill)
    else:
        print("Excellent! You have all listed skills.")

    print("\n===== COMMUNICATION =====")
    print("Communication level:", selected_student["communication"])

    # ===== INTERNSHIP MATCHING =====

print("\n===== INTERNSHIP MATCHING =====")

internships = [
    {
        "title": "Python Developer Intern",
        "company": "Tech Solutions",
        "skills": ["Python"]
    },
    {
        "title": "Backend Developer Intern",
        "company": "CodeWorks",
        "skills": ["Python", "SQL"]
    },
    {
        "title": "Java Developer Intern",
        "company": "Software Hub",
        "skills": ["Java", "SQL"]
    },
    {
        "title": "Web Developer Intern",
        "company": "WebTech",
        "skills": ["Web Development"]
    },
    {
        "title": "Data Analyst Intern",
        "company": "DataWorks",
        "skills": ["Python", "SQL", "Data Analysis"]
    }
]

# ===== INTERNSHIP MATCHING =====

matched_internships = []

for internship in internships:
    match_count = 0
    matched_skills = []
    missing_skills = []

    for skill in internship["skills"]:
        if skill in skills:
            match_count += 1

            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    if match_count > 0:
        percentage = (match_count / len(internship["skills"])) * 100
        matched_internships.append(
            (percentage, match_count, internship,matched_skills,missing_skills)
        )

matched_internships.sort(reverse=True, key=lambda x: x[0])

print("\n===== INTERNSHIP MATCHING =====")

if matched_internships:
    for percentage, match_count, internship,matched_skills,missing_skills in matched_internships:
        print("\nInternship:", internship["title"])
        print("Company:", internship["company"])
        print("Skill Match:", match_count, "/", len(internship["skills"]))
        print("Match Percentage:", round(percentage), "%")
        print("Matched Skills:",",".join(matched_skills))
        if missing_skills:
            print("Missing_skills:",",".join(missing_skills))
        else:
            print("Missing Skills : None")
else:
    print("No suitable internship found.")

print("\n===== END =====")