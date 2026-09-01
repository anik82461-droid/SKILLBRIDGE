import json
import os

# Load existing students
if os.path.exists("students.json"):
    with open("students.json", "r") as file:
        students = json.load(file)
else:
    students = []

# Enter student details
name = input("Enter student name: ")
python = input("Python skill (yes/no): ")
sql = input("SQL skill (yes/no): ")
java = input("Java skill (yes/no): ")
web = input("Web Development skill (yes/no): ")
data = input("Data Analysis skill (yes/no): ")
communication = input("Communication (good/average): ")

student = {
    "name": name,
    "python": python,
    "sql": sql,
    "java": java,
    "web": web,
    "data": data,
    "communication": communication
}

students.append(student)

print("\nStudent added successfully!")
print(students)

# Save students
with open("students.json", "w") as file:
    json.dump(students, file, indent=4)

print("Student data saved!")


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