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
	public BasicDataSource dataSource() { // mysql�뿰�룞
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
		dataSource.setUrl("jdbc:mysql://192.168.0.122:3306/videochat?serverTimezone=UTC");
		dataSource.setUsername("root");
		dataSource.setPassword("root");
		return dataSource;
	}
   
	@Bean
	public SqlSessionFactoryBean sqlSessionFactory() throws Exception { // mybatis �뿰�룞�쓣 �쐞�븳 SqlSessionFactory
		SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
		sqlSessionFactory.setDataSource(dataSource());
		sqlSessionFactory.setConfigLocation(new PathMatchingResourcePatternResolver().getResource("classpath:mybatis-config.xml")); // mybatis-config �벑濡�
		return sqlSessionFactory;
	}
   
	@Bean
	public SqlSessionTemplate sqlSession(SqlSessionFactoryBean sqlsessionFactory) throws Exception { // mybatis �뿰�룞�쓣 �쐞�븳 sqlSession
		return new SqlSessionTemplate(sqlsessionFactory.getObject());
	}
   
	@Bean
	public PlatformTransactionManager transactionManager() { // Transaction 泥섎━瑜� �쐞�븳 �꽕�젙
		DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
		transactionManager.setDataSource(dataSource());
		return transactionManager;
	}
}
