# LifeLogger - Digital Journaling App

LifeLogger is a full-stack Python web application designed for logging daily activities, thoughts, and progress. It serves as a digital journal, allowing users to create, view, and manage their life entries through a simple web interface.

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white)
![Jinja2](https://img.shields.io/badge/Jinja-B41717?style=for-the-badge&logo=jinja&logoColor=white)

## Features

* **User Authentication:** (Inferred) Secure user sign-up and login.
* **Log Entries:** Create, read, update, and delete journal or activity entries.
* **Data-Driven:** All entries are saved to a persistent database.
* **Web Interface:** A clean, server-rendered frontend for interacting with your logs.

## Technology Stack

* **Backend:** Python (FastAPI/Flask inferred)
* **Database:** SQLAlchemy (likely with SQLite or PostgreSQL)
* **Frontend:** Jinja2 for HTML templating
* **Routing:** Modular routes (inferred from `routes/` folder)

## Project Structure

The repository follows a standard, modular Python web application layout:

LIfeLogger/ ├── .venv/ # Virtual environment (should be gitignored) ├── routes/ # API/page routes (e.g., auth.py, logs.py) ├── static/ # Static files (CSS, JS) ├── templates/ # HTML (Jinja2) templates ├── database.py # Database connection and session logic ├── main.py # Main application entry point (FastAPI/Flask app) ├── models.py # SQLAlchemy database models └── requirements.txt # Project dependencies


## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

* [Python 3.8+](https://www.python.org/downloads/)
* [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/akshat1903kk/LIfeLogger.git](https://github.com/akshat1903kk/LIfeLogger.git)
    cd LIfeLogger
    ```

2.  **Create and activate a virtual environment:**
    * **Windows:**
        ```bash
        python -m venv venv
        .\venv\Scripts\activate
        ```
    * **macOS / Linux:**
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```

3.  **Install the required dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Initialize the Database:**
    *(This step may be automatic when you first run the app. If not, you may need to run a command to create the database tables based on `models.py`)*

## Usage

Once the dependencies are installed, you can run the application:

```bash
# This command assumes the app is run from main.py
# It could be 'python main.py' or 'uvicorn main:app --reload'
uvicorn main:app --reload
After running the command, open your web browser and navigate to http://127.0.0.1:8000 (or the port specified in the terminal).

Contributing
Contributions are what make the open-source community such an amazing place. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/NewFeature)

Commit your Changes (git commit -m 'Add some NewFeature')

Push to the Branch (git push origin feature/NewFeature)

Open a Pull Request
