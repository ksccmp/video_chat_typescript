package sc.video.chat.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import sc.video.chat.jwt.JwtInterceptor;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"sc.video.chat.controller", "sc.video.chat.config", "sc.video.chat.jwt"})
public class ServletContext implements WebMvcConfigurer {
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/"); // swagger 등록
		registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/"); // swagger 등록
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
	}
	
	@Bean
	public ViewResolver viewResolver() {
		InternalResourceViewResolver vr = new InternalResourceViewResolver();
		vr.setPrefix("/"); // Controller에서 jsp파일 위치를 src/main/webapp/ 로 판단
		vr.setSuffix(".jsp");
		return vr;
	}
	
	@Autowired
	private JwtInterceptor jwtInter;
	
	private final String excludePath[] = {
			// 토큰을 생성해야 하는 곳인 로그인과 회원가입 관련된 곳 제외, ex) http://localhost:8080/user/{*}
            "/user/**",

            // swagger 제외
            "/v2/api-docs",
            "/swagger-resources/**", 
            "/swagger-ui.html/**",
            "/webjars/**"
	};
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("*")
				.allowedMethods("*")
				.allowedHeaders("*")
				.exposedHeaders("jwt-user-token");
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) { // addCorsMappings와 addInterceptors의 위치가 바뀔 시 에러 발생 가능
		registry.addInterceptor(jwtInter)
				.addPathPatterns("/**") // 적용 경로 지정
				.excludePathPatterns(excludePath); // 제외 경로 지정
	}
}
