const sortByDueDate = (tasks) => {
    return tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
  };
  
  // Sort by priority
  const sortByPriority = (tasks) => {
    const priorityOrder = { 'Low': 3, 'Medium': 2, 'High': 1, 'Critical': 0 };
    return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };
  
  // Sort by status
  const sortByStatus = (tasks) => {
    const statusOrder = { 'Cancelled': 0, 'Pending': 1, 'In Progress': 2, 'On hold': 3, 'Done': 4 };
    return tasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  };
  
  // Sort by task_name
  const sortByTaskName = (tasks) => {
    return tasks.sort((a, b) => a.task_name.localeCompare(b.task_name));
  };
  
  // Sort by work_hour_required
  const sortByWorkHoursRequired = (tasks) => {
    return tasks.sort((a, b) => a.work_hour_required - b.work_hour_required);
  };

  const sortByID = (tasks) => {
    return tasks.sort((a, b) => a.id - b.id);
  }

  const sortByAssignDate = (tasks) => {
    return tasks.sort((a, b) => new Date(a.assignee_dates) - new Date(b.assignee_dates));
  }

  const sortByCreated_at = (tasks) => {
    return tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }


  export {
    sortByDueDate,
    sortByPriority,
    sortByStatus,
    sortByTaskName,
    sortByWorkHoursRequired,
    sortByID,
    sortByAssignDate,
    sortByCreated_at
  };

