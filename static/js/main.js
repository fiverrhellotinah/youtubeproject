$(document).ready(function () {

    const projectTypeOptions = {
        'Coding': 'Senior Engineer',
        'Art': 'Artist',
        'Art & craft': 'Craftsman',
        'Music': 'Musician',
        'Dance': 'Dancer',
        'Cooking': 'Chef',
        'Photography': 'Photographer',
        'Writing': 'Author',
        'Design': 'Designer',
        'Marketing': 'Marketing Specialist',
        'Finance': 'Financial Analyst',
        'Science': 'Scientist',
        'Mathematics': 'Mathematician',
        'History': 'Historian',
        'Philosophy': 'Philosopher'
    };

    const projectTypeDropdown = $('#project_type_dropdown');

    $.each(projectTypeOptions, function(key, value) {
        projectTypeDropdown.append($('<option>', {
            value: key.toLowerCase(),
            text: key
        }));
    });

    const referencPreferenceDropDown = $("#reference_preference")

    const referencePreferanceOptions= {"Youtube": "youtube", "Book": "book", "List of Authors": "list of authors"}

    

    $.each(referencePreferanceOptions, function(key, value) {
        referencPreferenceDropDown.append($('<option>', {
            value:  key.toLowerCase(),
            text: key
        }));
    });

    function createTimeDurationObject() {
        let durations = [];

        for (let i = 1; i <= 20; i++) {
            durations.push({ key: `${i} hour${i > 1 ? 's' : ''}`, value: i });
        }
    
        for (let i = 1; i <= 30; i++) {
            durations.push({ key: `${i} day${i > 1 ? 's' : ''}`, value: i * 24 });
        }
    
        
        for (let i = 1; i <= 9; i++) {
            durations.push({ key: `${i} month${i > 1 ? 's' : ''}`, value: i * 30 * 24 });
        }
    
        
        durations.sort((a, b) => a.value - b.value);
    
        
        const sortedDurations = {};
        durations.forEach(duration => {
            sortedDurations[duration.key] = duration.value;
        });
    
        return sortedDurations;
    }
    
    const timeFrameOptions = createTimeDurationObject()

    const timeFrameDropdown = $("#timeframe")


    

    $.each(timeFrameOptions, function(key, value) {
        timeFrameDropdown.append($('<option>', {
            value: key,
            text: key
        }));
    });

    const timeConstraintsDropdown = $("#time_constraint")


    

    $.each(timeFrameOptions, function(key, value) {
        timeConstraintsDropdown.append($('<option>', {
            value: key,
            text: key
        }));
    });


    const baseUrl = window.location.origin;

    const converter = new showdown.Converter();
    
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
                const html = converter.makeHtml(data.response);
                $('#studyPlanResponse').html(html);
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
                const html = converter.makeHtml(data.response);
                $('#explainConceptResponse').html(html);
                $('#explainConceptResponseContainer').removeClass('hidden');
            } catch (error) {
                console.log(error);
                if(error.message) {
                    $('#explainConceptErrorMessageContainer').removeClass('hidden').addClass('flex');
                    $('#explainConceptErrorMessage').text(error.message);
                }
            }
            finally {
                $('#explainConceptSubmitBtn').text('Explain');
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
                const html = converter.makeHtml(data.response);
                $('#buildProjectResponse').html(html);
                $('#buildProjectResponseContainer').removeClass('hidden');
            } catch (error) {
                console.log(error);
                if(error.message) {
                    $('#buildProjectErrorMessageContainer').removeClass('hidden').addClass('flex');
                    $('#buildProjectErrorMessage').text(error.message);
                }
            }
            finally {
                $('#buildProjectSubmitBtn').text('Build');
                $('#buildProjectSubmitBtn').prop('disabled', false);
            }
        })();
    });

    $('#closeBuildProjectErrorBtn').on('click', function() {
        $('#buildProjectErrorMessageContainer').removeClass('flex').addClass('hidden');
    });

});
