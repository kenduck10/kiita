package com.kenduck.plugin.mybatis;

import org.mybatis.generator.api.IntrospectedTable;
import org.mybatis.generator.api.PluginAdapter;
import org.mybatis.generator.api.dom.java.TopLevelClass;

import java.util.List;

public class MyBatisPlugin extends PluginAdapter {

    @Override
    public boolean validate(List<String> list) {
        return true;
    }

    @Override
    public boolean modelBaseRecordClassGenerated(TopLevelClass topLevelClass, IntrospectedTable introspectedTable) {
        // Lombok機能をimportする
        topLevelClass.addImportedType("lombok.AllArgsConstructor");
        // アノテーション追加
        topLevelClass.addAnnotation("@AllArgsConstructor");
        return true;
    }
}
