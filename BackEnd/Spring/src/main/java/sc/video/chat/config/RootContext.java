package sc.video.chat.config;

import org.apache.commons.dbcp2.BasicDataSource;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan(basePackages = {"sc.video.chat.repository", "sc.video.chat.service"})
@EnableTransactionManagement
public class RootContext {
	
	@Bean
	public BasicDataSource dataSource() { // mysql연동
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
		dataSource.setUrl("jdbc:mysql://localhost:3306/videochat?serverTimezone=UTC");
		dataSource.setUsername("root");
		dataSource.setPassword("root");
		return dataSource;
	}
   
	@Bean
	public SqlSessionFactoryBean sqlSessionFactory() throws Exception { // mybatis 연동을 위한 SqlSessionFactory
		SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
		sqlSessionFactory.setDataSource(dataSource());
		sqlSessionFactory.setConfigLocation(new PathMatchingResourcePatternResolver().getResource("classpath:mybatis-config.xml")); // mybatis-config 등록
		return sqlSessionFactory;
	}
   
	@Bean
	public SqlSessionTemplate sqlSession(SqlSessionFactoryBean sqlsessionFactory) throws Exception { // mybatis 연동을 위한 sqlSession
		return new SqlSessionTemplate(sqlsessionFactory.getObject());
	}
   
	@Bean
	public PlatformTransactionManager transactionManager() { // Transaction 처리를 위한 설정
		DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
		transactionManager.setDataSource(dataSource());
		return transactionManager;
	}
}
