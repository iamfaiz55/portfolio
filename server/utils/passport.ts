import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { JwtPayload } from "jsonwebtoken";
// import { JwtPayload } from "jsonwebtoken";
dotenv.config();
// console.log("process.env.JWT_KEY from service", process.env.JWT_KEY);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY as string,
    },
    async (jwtPayload: JwtPayload, done) => {
      try {
        return done(null, jwtPayload);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

export default passport;
