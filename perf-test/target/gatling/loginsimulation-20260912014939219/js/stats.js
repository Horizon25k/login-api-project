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
        "total": "21",
        "ok": "21",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "587",
        "ok": "587",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "228",
        "ok": "228",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "73",
        "ok": "73",
        "ko": "-"
    },
    "percentiles1": {
        "total": "224",
        "ok": "224",
        "ko": "-"
    },
    "percentiles2": {
        "total": "292",
        "ok": "292",
        "ko": "-"
    },
    "percentiles3": {
        "total": "336",
        "ok": "336",
        "ko": "-"
    },
    "percentiles4": {
        "total": "382",
        "ok": "382",
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
        "total": "50.806",
        "ok": "50.806",
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
        "total": "153",
        "ok": "153",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "587",
        "ok": "587",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "292",
        "ok": "292",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "40",
        "ok": "40",
        "ko": "-"
    },
    "percentiles1": {
        "total": "291",
        "ok": "291",
        "ko": "-"
    },
    "percentiles2": {
        "total": "311",
        "ok": "311",
        "ko": "-"
    },
    "percentiles3": {
        "total": "356",
        "ok": "356",
        "ko": "-"
    },
    "percentiles4": {
        "total": "403",
        "ok": "403",
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
        "total": "25.403",
        "ok": "25.403",
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
        "total": "21",
        "ok": "21",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "534",
        "ok": "534",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "164",
        "ok": "164",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "32",
        "ok": "32",
        "ko": "-"
    },
    "percentiles1": {
        "total": "164",
        "ok": "164",
        "ko": "-"
    },
    "percentiles2": {
        "total": "181",
        "ok": "181",
        "ko": "-"
    },
    "percentiles3": {
        "total": "215",
        "ok": "215",
        "ko": "-"
    },
    "percentiles4": {
        "total": "246",
        "ok": "246",
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
        "total": "25.403",
        "ok": "25.403",
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
