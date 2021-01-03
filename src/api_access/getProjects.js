const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImUwOGI0NzM0YjYxNmE0MWFhZmE5MmNlZTVjYzg3Yjc2MmRmNjRmYTIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSnVzdGluIFRodXJtYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1aZG1PX0VuMFJucy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNrTUs4cmNjUXJnWkF0QTB5bnhPTGxscmJYbmVnL3M5Ni1jL3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9idWd0cmFja2luZy1hcGktYXV0aCIsImF1ZCI6ImJ1Z3RyYWNraW5nLWFwaS1hdXRoIiwiYXV0aF90aW1lIjoxNjA5NTMyMTUyLCJ1c2VyX2lkIjoiQjNDY3hSdm1ZQmQ2NU1XbWFEWldYWUxRNmNkMiIsInN1YiI6IkIzQ2N4UnZtWUJkNjVNV21hRFpXWFlMUTZjZDIiLCJpYXQiOjE2MDk3MDg2NTMsImV4cCI6MTYwOTcxMjI1MywiZW1haWwiOiJ0aHVybWFuLmp1c3RpbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzY4MTYxNzMzMzMwNTE5NTgwMCJdLCJlbWFpbCI6WyJ0aHVybWFuLmp1c3RpbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.BsTMGC8KN5Bu5B8o3soqu7TblGFZEt4cXRWev94xKtGC_qx-Dp4ajxs20M-kiwo4a5fZQ0KOG-YoyMV6vVL9w6l9wHY_OENtLvyHQ2_YkFKdithRrkjKH8dj0nzmOW3xD4KUs3yynIfDFLfNKhnUeACbhOR-QxuXo9RMQYmLi6DzWWz22TmEXYJt94ekoaKl3C15ZtjgiNgIiEED8E_j3n_nHgHrYVI_9rAVeEbUZcna4ZOfZJoLArpLQFRu1EBNT6z0iCvyW6WKKc_dbUHF72TXQanTbxIRENFseN3nUI7SaQPZT_c0BcuuDjvgsL7FrZV37-7UkUehaF_sqlpYEQ'

const myHeaders = new Headers({
    'Authorization': `JWT ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
})

const axiosHeaders = {
    'Authorization': `JWT ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
}

const getProjects = async () => {
    // const data = await fetch(
    //     "http://localhost:8000/api/teams/monks-test-team/projects/",
    //     {
    //         headers: myHeaders,
    //     }
    // ).then(response => response.json)
    // console.log(data)
    // return data
    // fetch("http://localhost:8000/api/teams/monks-test-team/projects/", {headers: myHeaders})
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             setIsLoaded(true);
    //             setItems(result);
    //         },
    //         // Note: it's important to handle errors here
    //         // instead of a catch() block so that we don't swallow
    //         // exceptions from actual bugs in components.
    //         (error) => {
    //             setIsLoaded(true);
    //             setError(error);
    //         }
    //     )
}

export {myHeaders, axiosHeaders}