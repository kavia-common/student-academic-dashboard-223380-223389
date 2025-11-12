#!/bin/bash
cd /home/kavia/workspace/code-generation/student-academic-dashboard-223380-223389/student_dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

