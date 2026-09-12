var stats = {
    type: "GROUP",
name: "All Requests",
path: "",
pathFormatted: "group_missing-name-b06d1",
stats: {
    "name": "All Requests",
    "numberOfRequests": {
        "total": "6300",
        "ok": "6300",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "27",
        "ok": "27",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "482",
        "ok": "482",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "200",
        "ok": "200",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "67",
        "ok": "67",
        "ko": "-"
    },
    "percentiles1": {
        "total": "195",
        "ok": "195",
        "ko": "-"
    },
    "percentiles2": {
        "total": "256",
        "ok": "256",
        "ko": "-"
    },
    "percentiles3": {
        "total": "305",
        "ok": "305",
        "ko": "-"
    },
    "percentiles4": {
        "total": "351",
        "ok": "351",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 6300,
    "percentage": 100
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "58.333",
        "ok": "58.333",
        "ko": "-"
    }
},
contents: {
"req_post--api-auth--abe8b": {
        type: "REQUEST",
        name: "POST /api/auth/register",
path: "POST /api/auth/register",
pathFormatted: "req_post--api-auth--abe8b",
stats: {
    "name": "POST /api/auth/register",
    "numberOfRequests": {
        "total": "3150",
        "ok": "3150",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "93",
        "ok": "93",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "482",
        "ok": "482",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "256",
        "ok": "256",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "41",
        "ok": "41",
        "ko": "-"
    },
    "percentiles1": {
        "total": "255",
        "ok": "255",
        "ko": "-"
    },
    "percentiles2": {
        "total": "280",
        "ok": "280",
        "ko": "-"
    },
    "percentiles3": {
        "total": "322",
        "ok": "322",
        "ko": "-"
    },
    "percentiles4": {
        "total": "367",
        "ok": "367",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 3150,
    "percentage": 100
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "29.167",
        "ok": "29.167",
        "ko": "-"
    }
}
    },"req_post--api-auth--984a4": {
        type: "REQUEST",
        name: "POST /api/auth/login",
path: "POST /api/auth/login",
pathFormatted: "req_post--api-auth--984a4",
stats: {
    "name": "POST /api/auth/login",
    "numberOfRequests": {
        "total": "3150",
        "ok": "3150",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "27",
        "ok": "27",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "365",
        "ok": "365",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "144",
        "ok": "144",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "32",
        "ok": "32",
        "ko": "-"
    },
    "percentiles1": {
        "total": "145",
        "ok": "145",
        "ko": "-"
    },
    "percentiles2": {
        "total": "167",
        "ok": "167",
        "ko": "-"
    },
    "percentiles3": {
        "total": "194",
        "ok": "194",
        "ko": "-"
    },
    "percentiles4": {
        "total": "217",
        "ok": "217",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 3150,
    "percentage": 100
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "29.167",
        "ok": "29.167",
        "ko": "-"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}
