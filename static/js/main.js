$(document).ready(function () {

    const options = {
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
    };

    const projectTypeDropdown = $('#project_type_dropdown');

    $.each(options, function(key, value) {
        projectTypeDropdown.append($('<option>', {
            value: value,
            text: key
        }));
    });

    const baseUrl = 'http://104.225.217.215:5127';
    
    /** STUDY PLAN SECTION */

    $('#studyPlanSubmitBtn').on('click', function() {
        (async function() {
            try {
                $('#studyPlanSubmitBtn').prop('disabled', true);
                $('#studyPlanSubmitBtn').text('Loading...');
                const form = document.getElementById('studyPlanForm');
                const formData = new FormData(form);
                formData.forEach(function(value, key) {
                    if(!value) {
                        throw new Error('Some fields are missing');
                    }
                });
                const response = await fetch(`${baseUrl}/study_plan_creator`, {
                    method: 'POST',
                    body: formData
                })
                if(!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                $('#studyPlanResponse').text(data.response);
                $('#studyPlanResponseContainer').removeClass('hidden');
            } catch (error) {
                console.log(error);
                if(error.message) {
                    $('#studyPlanErrorMessageContainer').removeClass('hidden').addClass('flex');
                    $('#studyPlanErrorMessage').text(error.message);
                }
            }
            finally {
                $('#studyPlanSubmitBtn').text('Create Plan');
                $('#studyPlanSubmitBtn').prop('disabled', false);
            }
        })();
    });

    $('#closeStudyPlanErrorBtn').on('click', function() {
        $('#studyPlanErrorMessageContainer').removeClass('flex').addClass('hidden');
    });

    /** EXPLAIN CONCEPT SECTION */

    $('#explainConceptSubmitBtn').on('click', function() {
        (async function() {
            try {
                $('#explainConceptSubmitBtn').prop('disabled', true);
                $('#explainConceptSubmitBtn').text('Loading...');
                const form = document.getElementById('explainConceptForm');
                const formData = new FormData(form);
                formData.forEach(function(value, key) {
                    if(!value) {
                        throw new Error('Some fields are missing');
                    }
                });
                const response = await fetch(`${baseUrl}/explain_concept`, {
                    method: 'POST',
                    body: formData
                })
                if(!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                $('#explainConceptResponse').text(data.response);
                $('#explainConceptResponseContainer').removeClass('hidden');
            } catch (error) {
                console.log(error);
                if(error.message) {
                    $('#explainConceptErrorMessageContainer').removeClass('hidden').addClass('flex');
                    $('#explainConceptErrorMessage').text(error.message);
                }
            }
            finally {
                $('#explainConceptSubmitBtn').text('Create Plan');
                $('#explainConceptSubmitBtn').prop('disabled', false);
            }
        })();
    });

    $('#closeExplainConceptErrorBtn').on('click', function() {
        $('#explainConceptErrorMessageContainer').removeClass('flex').addClass('hidden');
    });

    /** BUILD PROJECT SECTION */

    $('#buildProjectSubmitBtn').on('click', function() {
        (async function() {
            try {
                $('#buildProjectSubmitBtn').prop('disabled', true);
                $('#buildProjectSubmitBtn').text('Loading...');
                const form = document.getElementById('buildProjectForm');
                const formData = new FormData(form);
                formData.forEach(function(value, key) {
                    if(!value) {
                        throw new Error('Some fields are missing');
                    }
                });
                const response = await fetch(`${baseUrl}/build_project`, {
                    method: 'POST',
                    body: formData
                })
                if(!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                $('#buildProjectResponse').text(data.response);
                $('#buildProjectResponseContainer').removeClass('hidden');
            } catch (error) {
                console.log(error);
                if(error.message) {
                    $('#buildProjectErrorMessageContainer').removeClass('hidden').addClass('flex');
                    $('#buildProjectErrorMessage').text(error.message);
                }
            }
            finally {
                $('#buildProjectSubmitBtn').text('Create Plan');
                $('#buildProjectSubmitBtn').prop('disabled', false);
            }
        })();
    });

    $('#closeBuildProjectErrorBtn').on('click', function() {
        $('#buildProjectErrorMessageContainer').removeClass('flex').addClass('hidden');
    });

});