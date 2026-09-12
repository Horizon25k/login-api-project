package gatling

import com.intuit.karate.gatling.PreDef._
import io.gatling.core.Predef._
import scala.concurrent.duration._
import scala.language.postfixOps

class LoginSimulation extends Simulation {

  val protocol = karateProtocol(
    "/api/auth/login" -> pauseFor("constant" -> 0)
  )

  val loginScenario = scenario("Find Maximum User Capacity")
    .exec(karateFeature("classpath:perf-login.feature"))

  setUp(
    loginScenario.inject(
      // ไต่ระดับจาก 10 ถึง 200 users/sec ใน 30 วินาที
      rampUsersPerSec(10) to (50) during (30 seconds)
    ).protocols(protocol)
  )
}

