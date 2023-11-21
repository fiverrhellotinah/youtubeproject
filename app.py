from flask import Flask, render_template, request, redirect, url_for, flash,jsonify
import openai
import os
from dotenv import load_dotenv
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler
from werkzeug.utils import secure_filename
from datetime import datetime
load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
CORS(app)

# Setup logger
handler = RotatingFileHandler('app.log', maxBytes=100000, backupCount=3)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(handler)

@app.route('/',methods=['GET'])
def frontend():
    pass
    

@app.route('/study_plan_creator',methods=['POST','GET'])
def study_plan_creator():
    goal = request.form.get('goal')
    timeframe = request.form.get('timeframe')
    project_type = request.form.get('project_type')
    reference_preference = request.form.get('reference_preference')
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logger.info(f'Stated Time on study plan creator: {time}')
    logger.info(f'Goal: {goal}')
    logger.info(f'Timeframe: {timeframe}')
    logger.info(f'Project Type: {project_type}')
    logger.info(f'Reference Preference: {reference_preference}')



    # Define the dictionary
    experts = {
    'coding': 'Senior Engineer',
    'art': 'Artist',
    'art & craft': 'Craftsman',
    'music': 'Musician',
    'dance': 'Dancer',
    'cooking': 'Chef',
    'photography': 'Photographer',
    'writing': 'Author',
    'design': 'Designer',
    'marketing': 'Marketing Specialist',
    'finance': 'Financial Analyst',
    'science': 'Scientist',
    'mathematics': 'Mathematician',
    'history': 'Historian',
    'philosophy': 'Philosopher'
    }

    # Get the expert for the given project type
    expert = experts.get(project_type, 'General Coding Expert')

    system_prompt ='''
    Act as a tutor that creates study plans to help people to learn.
    You will be provided with the goal of the student, their time commitment, and resource preferences.
    You will create a study plan with timelines and links to resources. 
    Only include relevant resources because time is limited.
    '''

    query = f'''
    {goal}. I can study {timeframe} hours per week and only want {reference_preference}. 
    I want to learn {project_type}. {expert} create a study plan for me.
    '''


    try:
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[{
                'role':'system','content':system_prompt,
                'role':'user','content':query

            }],
            max_tokens=2000,
            temperature=0.1
        )
    except Exception as e:
        print(e)
        logger.error(f'Error: {e}')
        return jsonify({"error":e})
    
    #print(response.choices[0].message.content)
    logger.info(f'Response: {response.choices[0].message.content}')
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logger.info(f'End Time on study plan creator: {time}')

    return jsonify({"response":response.choices[0].message.content})
    


@app.route('/explain_concept',methods=['POST','GET'])
def explain_concept():
    concept_name = request.form.get('concept_name')
    weekly_time = request.form.get('weekly_time')
    time_frame = request.form.get('time_frame')
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logger.info(f'Stated Time on explain concept: {time}')
    logger.info(f'Concept Name: {concept_name}')

    system_prompt ='''
    Act as a personal learning tutor bot. 
    You will be provided with the goal of the student, their time commitment, and resource preferences. 
    You will compile a list of resources related to the specific topic, goal of the student, time commitment, and resource preferences of the student.
    Include between 3 - 5 resources, possibly also combining them together to provide a more comprehensive plan.
    '''

    query = f'''{concept_name}.I can dedicate  {weekly_time} hours per week for {time_frame} and only want free video resources.'''

    try:
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[{
                'role':'system','content':system_prompt,
                'role':'user','content':query

            }],
            max_tokens=2000,
            temperature=0.1
        )
    except Exception as e:
        print(e)
        logger.error(f'Error: {e}')
        return jsonify({"error":e})
    
    #print(response.choices[0].message.content)
    logger.info(f'Response: {response.choices[0].message.content}')
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logger.info(f'End Time on explain concept: {time}')

    return jsonify({"response":response.choices[0].message.content})






@app.route('/build_project',methods=['POST','GET'])
def build_project():
    goal = request.form.get('goal')
    project_type = request.form.get('project_type')
    time_constraint = request.form.get('time_constraint')
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logger.info(f'Stated Time on build project: {time}')
    logger.info(f'Goal: {goal}')
    logger.info(f'Project Type: {project_type}')
    logger.info(f'Time Constraint: {time_constraint}')

    # Define the dictionary
    experts = {
    'coding': 'Senior Engineer',
    'art': 'Artist',
    'art & craft': 'Craftsman',
    'music': 'Musician',
    'dance': 'Dancer',
    'cooking': 'Chef',
    'photography': 'Photographer',
    'writing': 'Author',
    'design': 'Designer',
    'marketing': 'Marketing Specialist',
    'finance': 'Financial Analyst',
    'science': 'Scientist',
    'mathematics': 'Mathematician',
    'history': 'Historian',
    'philosophy': 'Philosopher'
    }

    project_type = experts.get(project_type, 'General Coding Expert')

    system_prompt ='''
    Act as an expert Project Builder. User will provide a goal, time constraint, and project type.
    '''

    query = f'''
    {goal}. I have {time_constraint} to build a {project_type}.
    '''


    try:
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[{
                'role':'system','content':system_prompt,
                'role':'user','content':query

            }],
            max_tokens=2000,
            temperature=0.1
        )
    except Exception as e:
        print(e)
        logger.error(f'Error: {e}')
        return jsonify({"error":e})
    
    #print(response.choices[0].message.content)
    logger.info(f'Response: {response.choices[0].message.content}')
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logger.info(f'End Time on build project : {time}')

    return jsonify({"response":response.choices[0].message.content})



    



if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True,port=5127)